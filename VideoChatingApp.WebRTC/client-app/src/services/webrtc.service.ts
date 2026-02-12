import { SignalRService } from './signalr.service';
import { MediaConstraints } from '../models/webrtc.model';

export class WebRTCService {
private localStream: MediaStream | null = null;
private peerConnections: Map<string, RTCPeerConnection> = new Map();
private pendingOffers: Map<string, RTCSessionDescriptionInit> = new Map();
private activeCalls: Set<string> = new Set();
private eventHandlers: Map<string, Function[]> = new Map();
private signalRService: SignalRService;

  private rtcConfiguration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  constructor(signalRService: SignalRService, _userId: string) {
    this.signalRService = signalRService;
    this.setupSignalRHandlers();
  }

  private setupSignalRHandlers(): void {
    // Handle incoming call notification
    this.signalRService.on('IncomingCall', (fromUserId: string) => {
      console.log(`Incoming call from ${fromUserId}`);
      this.emit('incomingCall', fromUserId);
    });

    // Handle call accepted
    this.signalRService.on('CallAccepted', (fromUserId: string) => {
      console.log(`Call accepted by ${fromUserId}`);
      this.emit('callAccepted', fromUserId);
    });

    // Handle call rejected
    this.signalRService.on('CallRejected', (fromUserId: string, reason: string) => {
      console.log(`Call rejected by ${fromUserId}: ${reason}`);
      this.emit('callRejected', fromUserId, reason);
      this.closePeerConnection(fromUserId);
    });

    // Handle call cancelled
    this.signalRService.on('CallCancelled', (fromUserId: string) => {
      console.log(`Call cancelled by ${fromUserId}`);
      this.emit('callCancelled', fromUserId);
      this.pendingOffers.delete(fromUserId);
      this.activeCalls.delete(fromUserId);
      this.closePeerConnection(fromUserId);
    });

    this.signalRService.on('CallEnded', (fromUserId: string) => {
      console.log(`Call ended by ${fromUserId}`);
      this.emit('callEnded', fromUserId);
      this.activeCalls.delete(fromUserId);
      this.closePeerConnection(fromUserId);
    });

    this.signalRService.on('ReceiveOffer', async (senderId: string, offer: string) => {
      console.log(`Received offer from ${senderId}, storing for user acceptance`);
      const offerDesc: RTCSessionDescriptionInit = { type: 'offer', sdp: offer };
      this.pendingOffers.set(senderId, offerDesc);
    });

    this.signalRService.on('ReceiveAnswer', async (senderId: string, answer: string) => {
      await this.handleAnswer(senderId, answer);
    });

    this.signalRService.on('ReceiveIceCandidate', async (senderId: string, candidate: any) => {
      await this.handleIceCandidate(senderId, candidate);
    });
  }

  async initLocalMedia(constraints: MediaConstraints): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.emit('localStreamReady', this.localStream);
      return this.localStream;
    } catch (error) {
      console.error('Failed to get local media:', error);
      throw new Error('Could not access camera/microphone');
    }
  }

  async createOfferForUser(userId: string): Promise<void> {
    const peerConnection = this.createPeerConnection(userId);
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream!);
      });
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    await this.signalRService.sendOffer(userId, offer.sdp!);
  }

  async acceptCall(senderId: string): Promise<void> {
    const offer = this.pendingOffers.get(senderId);
    if (!offer) {
      console.error(`No pending offer from ${senderId}`);
      return;
    }

    await this.signalRService.acceptCall(senderId);
    await this.handleOffer(senderId, offer.sdp!);
    this.pendingOffers.delete(senderId);
    this.activeCalls.add(senderId);
  }

  async rejectCall(senderId: string, reason?: string): Promise<void> {
    await this.signalRService.rejectCall(senderId, reason);
    this.pendingOffers.delete(senderId);
    this.activeCalls.delete(senderId);
    this.closePeerConnection(senderId);
  }

  async cancelCall(userId: string): Promise<void> {
    await this.signalRService.cancelCall(userId);
    this.activeCalls.delete(userId);
    this.closePeerConnection(userId);
  }

  async endCall(userId: string): Promise<void> {
    await this.signalRService.endCall(userId);
    this.activeCalls.delete(userId);
    this.closePeerConnection(userId);
  }

  getActiveCalls(): string[] {
    return Array.from(this.activeCalls);
  }

  private async handleOffer(senderId: string, offerSdp: string): Promise<void> {
    const peerConnection = this.createPeerConnection(senderId);

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream!);
      });
    }

    const offer: RTCSessionDescriptionInit = { type: 'offer', sdp: offerSdp };
    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    await this.signalRService.sendAnswer(senderId, answer.sdp!);
  }

  private async handleAnswer(senderId: string, answerSdp: string): Promise<void> {
    const peerConnection = this.peerConnections.get(senderId);
    if (peerConnection) {
      const answer: RTCSessionDescriptionInit = { type: 'answer', sdp: answerSdp };
      await peerConnection.setRemoteDescription(answer);
    }
  }

  private async handleIceCandidate(senderId: string, candidateData: any): Promise<void> {
    const peerConnection = this.peerConnections.get(senderId);
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
    }
  }

  private createPeerConnection(userId: string): RTCPeerConnection {
    if (this.peerConnections.has(userId)) {
      return this.peerConnections.get(userId)!;
    }

    const peerConnection = new RTCPeerConnection(this.rtcConfiguration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.signalRService.sendIceCandidate(userId, event.candidate.toJSON());
      }
    };

    peerConnection.ontrack = (event) => {
      console.log('Received remote track from:', userId);
      this.emit('remoteStream', userId, event.streams[0]);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state with ${userId}:`, peerConnection.connectionState);
      this.emit('connectionStateChange', userId, peerConnection.connectionState);

      if (peerConnection.connectionState === 'disconnected' || 
          peerConnection.connectionState === 'failed' ||
          peerConnection.connectionState === 'closed') {
        this.closePeerConnection(userId);
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(`ICE connection state with ${userId}:`, peerConnection.iceConnectionState);
    };

    this.peerConnections.set(userId, peerConnection);
    return peerConnection;
  }

  closePeerConnection(userId: string): void {
    const peerConnection = this.peerConnections.get(userId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(userId);
      this.emit('connectionClosed', userId);
    }
  }

  closeAllConnections(): void {
    this.peerConnections.forEach((_, userId) => {
      this.closePeerConnection(userId);
    });
  }

  async toggleAudio(enabled: boolean): Promise<void> {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  async toggleVideo(enabled: boolean): Promise<void> {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  cleanup(): void {
    this.closeAllConnections();
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  off(event: string, handler: Function): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emit(event: string, ...args: any[]): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getPeerConnections(): Map<string, RTCPeerConnection> {
    return this.peerConnections;
  }
}
