/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer for Retro 8-bit Arcade Sound Effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterVolume = this.ctx.createGain();
        this.masterVolume.gain.setValueAtTime(0.15, this.ctx.currentTime); // keep volume comfortable
        this.masterVolume.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser:", e);
    }
  }

  public setVolume(volume: number) {
    this.init();
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  public isMuted(): boolean {
    return !this.soundEnabled;
  }

  private resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play correct answer ding
  public playCorrect() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.connect(gain);
    gain.connect(this.masterVolume);

    // Cute double note arpeggio
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Play incorrect answer buzzer
  public playIncorrect() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.connect(gain);
    gain.connect(this.masterVolume);

    // Falling dissonant buzzer
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(110, now + 0.35); // A2

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Play slot tick sound when rotating
  public playSpinTick() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.connect(gain);
    gain.connect(this.masterVolume);

    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Play slot lever pull sound
  public playLeverPull() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    
    // Low frequency slide down (clunk)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.linearRampToValueAtTime(60, now + 0.15);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.masterVolume);
    osc1.start(now);
    osc1.stop(now + 0.16);

    // Brief friction sound (metallic slide)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(600, now + 0.05);
    osc2.frequency.linearRampToValueAtTime(300, now + 0.2);
    gain2.gain.setValueAtTime(0.1, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc2.connect(gain2);
    gain2.connect(this.masterVolume);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.21);
  }

  // Play reward celebration fanfare
  public playRewardFanfare() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterVolume) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      const noteStart = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, noteStart);
      
      // Add a retro pitch vibrato
      osc.frequency.setValueAtTime(freq * 1.02, noteStart + 0.04);
      
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.4, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.3);
      
      osc.start(noteStart);
      osc.stop(noteStart + 0.35);
    });
  }

  // Play game over music chord
  public playGameOver() {
    if (!this.soundEnabled) return;
    this.resume();
    if (!this.ctx || !this.masterVolume) return;

    const now = this.ctx.currentTime;
    // Sad minor arpeggio
    const notes = [392.00, 311.13, 261.63, 196.00]; // G4 -> Eb4 -> C4 -> G3
    
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterVolume) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sawtooth";
      osc.connect(gain);
      gain.connect(this.masterVolume);
      
      const noteStart = now + idx * 0.25;
      osc.frequency.setValueAtTime(freq, noteStart);
      osc.frequency.linearRampToValueAtTime(freq - 10, noteStart + 0.8);
      
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.25, noteStart + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.8);
      
      osc.start(noteStart);
      osc.stop(noteStart + 0.85);
    });
  }
}

export const sfx = new SoundEngine();
