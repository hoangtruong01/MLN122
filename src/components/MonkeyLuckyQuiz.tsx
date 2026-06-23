/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Volume2, VolumeX, RotateCcw, Trophy, Play, Sparkles, 
  Heart, Shield, Zap, Award, HelpCircle, CheckCircle2, 
  XCircle, ArrowRight, Star, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { quizQuestions, luckyRewards, Question, Reward, RewardType } from "../data/quizData";
import { sfx } from "../utils/soundEffects";

type GameState = "welcome" | "quiz" | "lucky_spin" | "reward_reveal" | "game_over";

export default function MonkeyLuckyQuiz() {
  // Sound mute state
  const [isMuted, setIsMuted] = useState(false);

  // Player Stats
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [shield, setShield] = useState(0);
  const [combo, setCombo] = useState(0);
  const [peakCombo, setPeakCombo] = useState(0);
  
  // Game Flow States
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Quiz Interaction States
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnsweringLocked, setIsAnsweringLocked] = useState(false);

  // Lucky Spin States
  const [isLeverPulled, setIsLeverPulled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelSymbol, setReelSymbol] = useState("❓");
  const [drawnReward, setDrawnReward] = useState<Reward | null>(null);
  const [spinItems, setSpinItems] = useState<string[]>([]);
  const [rewardHistory, setRewardHistory] = useState<Reward[]>([]);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("monkey_quiz_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Sync mute state with sfx engine
  const handleToggleMute = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  // Start / Restart Game
  const handleStartGame = () => {
    // Shuffle questions
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setHearts(3);
    setShield(0);
    setCombo(0);
    setPeakCombo(0);
    setRewardHistory([]);
    resetQuizSelection();
    setGameState("quiz");
  };

  const resetQuizSelection = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);
    setIsAnsweringLocked(false);
  };

  // Handle Question Answer
  const handleAnswerClick = (optionIndex: number) => {
    if (isAnsweringLocked) return;
    setIsAnsweringLocked(true);
    setSelectedAnswer(optionIndex);

    const question = shuffledQuestions[currentQuestionIndex];
    const correct = optionIndex === question.correctAnswer;
    setIsAnswerCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      sfx.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > peakCombo) {
        setPeakCombo(newCombo);
      }
      
      // Calculate question points (base 10 points * combo multiplier)
      const basePoints = 10;
      const questionScore = basePoints + (newCombo - 1) * 5;
      setScore((prev) => prev + questionScore);

      // Transition to Lucky Spin after a brief delay
      setTimeout(() => {
        setGameState("lucky_spin");
        setIsLeverPulled(false);
        setIsSpinning(false);
        setReelSymbol("❓");
        setDrawnReward(null);
      }, 2000);

    } else {
      sfx.playIncorrect();
      setCombo(0); // Reset combo

      // Check for shield
      if (shield > 0) {
        setShield((prev) => Math.max(0, prev - 1));
      } else {
        setHearts((prev) => {
          const nextHearts = prev - 1;
          if (nextHearts <= 0) {
            // Delay game over screen so user can see correct answer
            setTimeout(() => {
              handleGameOver();
            }, 2500);
          }
          return nextHearts;
        });
      }

      // If they still have hearts, move to next question after delay
      if (hearts > 1 || shield > 0) {
        setTimeout(() => {
          handleNextQuestion();
        }, 2800);
      }
    }
  };

  // Move to next question or end game
  const handleNextQuestion = () => {
    resetQuizSelection();
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= shuffledQuestions.length) {
      handleGameOver();
    } else {
      setCurrentQuestionIndex(nextIndex);
      setGameState("quiz");
    }
  };

  // Handle Game Over
  const handleGameOver = () => {
    sfx.playGameOver();
    setGameState("game_over");
    
    // Save high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("monkey_quiz_highscore", score.toString());
    }
  };

  // Pull Slot Machine Lever
  const handlePullLever = () => {
    if (isLeverPulled || isSpinning) return;
    
    sfx.playLeverPull();
    setIsLeverPulled(true);
    setIsSpinning(true);

    // Prepare rapid symbol shuffling for spin animation
    let tickCount = 0;
    const icons = luckyRewards.map(r => r.icon);
    
    const interval = setInterval(() => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      setReelSymbol(randomIcon);
      sfx.playSpinTick();
      tickCount++;
      
      if (tickCount > 15) {
        clearInterval(interval);
        determineReward();
      }
    }, 100);
  };

  // Select reward based on probability weight
  const determineReward = () => {
    const totalWeight = luckyRewards.reduce((sum, r) => sum + r.weight, 0);
    let rand = Math.random() * totalWeight;
    
    let selectedReward = luckyRewards[0];
    for (const reward of luckyRewards) {
      if (rand < reward.weight) {
        selectedReward = reward;
        break;
      }
      rand -= reward.weight;
    }

    setDrawnReward(selectedReward);
    setReelSymbol(selectedReward.icon);
    setIsSpinning(false);
    setGameState("reward_reveal");
    
    sfx.playRewardFanfare();

    // Apply reward effects
    setRewardHistory((prev) => [selectedReward, ...prev]);

    if (selectedReward.effect.scoreBonus) {
      // Score bonus amplified by current combo!
      const bonus = selectedReward.effect.scoreBonus * (1 + Math.floor(combo / 2));
      setScore((prev) => prev + bonus);
    }
    if (selectedReward.effect.heartsBonus) {
      setHearts((prev) => Math.min(5, prev + selectedReward.effect.heartsBonus!));
    }
    if (selectedReward.effect.shieldsBonus) {
      setShield((prev) => Math.min(3, prev + selectedReward.effect.shieldsBonus!));
    }
  };

  // Render SVG Monkey dynamically depending on game states
  const renderMonkeyCharacter = (expression: "happy" | "sad" | "thinking" | "excited" | "crowned") => {
    let eyeElements = (
      <>
        <circle cx="85" cy="85" r="7" fill="#0f172a" />
        <circle cx="115" cy="85" r="7" fill="#0f172a" />
        <circle cx="83" cy="83" r="2.5" fill="#ffffff" />
        <circle cx="113" cy="83" r="2.5" fill="#ffffff" />
      </>
    );

    let mouthElement = <path d="M 80,105 Q 100,120 120,105" fill="none" stroke="#65350f" strokeWidth="4" strokeLinecap="round" />;
    let cheekElements = (
      <>
        <ellipse cx="73" cy="95" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
        <ellipse cx="127" cy="95" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
      </>
    );
    let eyebrowElements = (
      <>
        <path d="M 75,76 Q 85,72 93,78" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 125,76 Q 115,72 107,78" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
      </>
    );
    let hatElement = null;

    if (expression === "thinking") {
      eyeElements = (
        <>
          <path d="M 77,85 Q 85,88 93,85" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="115" cy="85" r="6" fill="#0f172a" />
          <circle cx="113" cy="83" r="2" fill="#ffffff" />
        </>
      );
      eyebrowElements = (
        <>
          <path d="M 74,72 Q 85,75 94,78" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 124,75 Q 115,70 106,72" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
      mouthElement = <path d="M 85,110 Q 100,105 115,110" fill="none" stroke="#65350f" strokeWidth="3" strokeLinecap="round" />;
      cheekElements = <ellipse cx="127" cy="95" rx="5" ry="3" fill="#fb7185" opacity="0.4" />;
    } else if (expression === "sad") {
      eyeElements = (
        <>
          <path d="M 78,90 Q 85,80 92,90" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <path d="M 108,90 Q 115,80 122,90" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          {/* Tear drops */}
          <path d="M 82,93 C 82,98 78,103 82,105 C 84,105 84,98 82,93" fill="#38bdf8" />
        </>
      );
      eyebrowElements = (
        <>
          <path d="M 75,79 Q 85,83 93,79" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 125,79 Q 115,83 107,79" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
      mouthElement = <path d="M 85,115 Q 100,100 115,115" fill="none" stroke="#65350f" strokeWidth="4" strokeLinecap="round" />;
      cheekElements = null;
    } else if (expression === "excited") {
      eyeElements = (
        <>
          <path d="M 77,82 L 91,89" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 77,89 L 91,82" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 109,82 L 123,89" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 109,89 L 123,82" fill="none" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
        </>
      );
      mouthElement = (
        <g>
          <path d="M 80,102 Q 100,128 120,102 Z" fill="#b91c1c" />
          <path d="M 88,112 Q 100,124 112,112" fill="#fda4af" />
        </g>
      );
    } else if (expression === "crowned") {
      eyeElements = (
        <>
          <circle cx="85" cy="85" r="7" fill="#0f172a" />
          <circle cx="115" cy="85" r="7" fill="#0f172a" />
          <circle cx="83" cy="83" r="2.5" fill="#ffffff" />
          <circle cx="113" cy="83" r="2.5" fill="#ffffff" />
          {/* Star sparkle next to eyes */}
          <path d="M 132,75 L 134,79 L 138,80 L 134,82 L 132,86 L 130,82 L 126,80 L 130,79 Z" fill="#eab308" />
        </>
      );
      mouthElement = (
        <g>
          <path d="M 80,102 Q 100,128 120,102 Z" fill="#b91c1c" />
          <path d="M 85,102 Q 100,108 115,102" fill="none" stroke="#fef08a" strokeWidth="3" />
        </g>
      );
      // Gold crown
      hatElement = (
        <path d="M 75,52 L 80,35 L 90,43 L 100,32 L 110,43 L 120,35 L 125,52 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" strokeLinejoin="round" />
      );
    }

    return (
      <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-md">
        {/* Outer Ears */}
        <circle cx="45" cy="95" r="25" fill="#854d0e" stroke="#451a03" strokeWidth="3" />
        <circle cx="155" cy="95" r="25" fill="#854d0e" stroke="#451a03" strokeWidth="3" />
        {/* Inner Ears */}
        <circle cx="45" cy="95" r="15" fill="#fed7aa" />
        <circle cx="155" cy="95" r="15" fill="#fed7aa" />

        {/* Head Base */}
        <circle cx="100" cy="100" r="60" fill="#854d0e" stroke="#451a03" strokeWidth="4" />

        {/* Face Mask (Heart Shape Face) */}
        <path d="M 100,60 C 70,60 50,75 52,105 C 54,130 80,148 100,148 C 120,148 146,130 148,105 C 150,75 130,60 100,60 Z" fill="#fed7aa" />

        {/* Features */}
        {eyebrowElements}
        {eyeElements}
        {cheekElements}
        {mouthElement}

        {/* Cute Nose */}
        <ellipse cx="100" cy="96" rx="7" ry="4" fill="#451a03" />

        {/* Hat/Crown */}
        {hatElement}
      </svg>
    );
  };

  return (
    <section id="game-quiz" className="py-24 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Jungle Leaves/Backgrounds */}
      <div className="absolute top-10 left-5 text-emerald-900/10 pointer-events-none text-9xl font-bold select-none z-0">🌿</div>
      <div className="absolute bottom-20 right-5 text-emerald-900/10 pointer-events-none text-9xl font-bold select-none z-0">🌴</div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl" />

      {/* Control Bar (Mute button & section title) */}
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* ================= HUD MUTE BUTTON ================= */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-900/40 border border-emerald-500/30 rounded-xl">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-emerald-400 to-yellow-200">
                Monkey Lucky Quiz
              </h2>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Mini-game Học thuyết Chương 5</p>
            </div>
          </div>
          
          <button
            onClick={handleToggleMute}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-950/80 hover:bg-slate-800 text-slate-350 cursor-pointer transition-colors active:scale-95 flex items-center gap-1.5"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="text-xs font-semibold hidden sm:inline">{isMuted ? "Tắt âm" : "Bật âm"}</span>
          </button>
        </div>

        {/* ================= WELCOME SCREEN ================= */}
        <AnimatePresence mode="wait">
          {gameState === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-slate-950/70 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-center"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-500 via-emerald-500 to-yellow-500 rounded-t-3xl" />
              
              {/* Cute monkey welcomes user */}
              <div className="mb-6">
                {renderMonkeyCharacter("happy")}
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span>Kỷ lục hiện tại: {highScore} điểm</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-white">Chào mừng tới Lucky Quiz!</h3>
              <p className="text-sm md:text-base text-slate-350 max-w-xl mx-auto leading-relaxed mb-8">
                Trả lời đúng các câu hỏi trắc nghiệm khách quan về **Kinh tế thị trường định hướng XHCN** (Chương 5) để mở khóa **Cần gạt quay thưởng may mắn**.
                Tích lũy khiên hộ mệnh, hồi sinh tim, nhận chuối tăng điểm và bùng nổ combo điểm cao!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left max-w-2xl mx-auto">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                    <Heart className="w-4 h-4 fill-red-500 stroke-red-500" />
                    <span>3 Mạng Sống</span>
                  </div>
                  <p className="text-xs text-slate-400">Trả lời sai bị trừ 1 tim. Hết tim là Game Over.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                    <Shield className="w-4 h-4 text-sky-400 fill-sky-950" />
                    <span>Khiên Hộ Mệnh</span>
                  </div>
                  <p className="text-xs text-slate-400">Sở hữu khiên giúp đỡ mất tim khi chọn đáp án sai.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-bold text-xs sm:text-sm">
                    <Zap className="w-4 h-4 text-yellow-400 fill-yellow-950" />
                    <span>Nâng Tầm Combo</span>
                  </div>
                  <p className="text-xs text-slate-400">Luyện mạch thắng liên tiếp để nhân hệ số điểm bùng nổ.</p>
                </div>
              </div>

              <button
                onClick={handleStartGame}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-yellow-500 via-emerald-500 to-yellow-500 hover:from-yellow-400 hover:to-emerald-400 text-slate-950 font-black uppercase text-sm sm:text-base tracking-wider rounded-2xl active:scale-95 transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Bắt đầu chơi ngay</span>
              </button>
            </motion.div>
          )}

          {/* ================= QUIZ PLAY SCREEN ================= */}
          {gameState === "quiz" && shuffledQuestions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* TOP HUD STATUS BAR */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-slate-950/70 border border-emerald-500/20 p-4 rounded-2xl shadow-lg relative overflow-hidden">
                {/* Score */}
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Điểm số</span>
                  <span className="text-lg font-black text-white">{score}</span>
                </div>
                
                {/* Hearts */}
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Mạng sống</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Heart 
                        key={idx} 
                        className={`w-4 h-4 ${
                          idx < hearts 
                            ? "fill-red-500 stroke-red-500 animate-heartbeat" 
                            : "text-slate-700"
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Shield */}
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Khiên chắn</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <Shield 
                        key={idx} 
                        className={`w-4 h-4 ${
                          idx < shield 
                            ? "fill-sky-400 text-sky-300" 
                            : "text-slate-700"
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Combo */}
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Mạch Combo</span>
                  <span className="text-lg font-black text-yellow-400 flex items-center gap-1">
                    🔥 x{combo}
                  </span>
                </div>

                {/* Question progress */}
                <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Tiến trình</span>
                  <span className="text-sm font-black text-slate-200">
                    {currentQuestionIndex + 1} / {shuffledQuestions.length}
                  </span>
                </div>
              </div>

              {/* MAIN QUIZ CARD */}
              <div className="bg-slate-950/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                
                {/* Question Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/20 px-3 py-1 rounded-full">
                    Câu hỏi số {currentQuestionIndex + 1}
                  </span>
                  {combo > 1 && (
                    <span className="text-xs font-bold text-yellow-300 animate-bounce bg-yellow-950/50 border border-yellow-500/20 px-2.5 py-1 rounded-full">
                      Hệ số điểm: x{1 + (combo - 1) * 0.5} 📈
                    </span>
                  )}
                </div>

                {/* Character Expression on quiz screen */}
                <div className="mb-6">
                  {renderMonkeyCharacter(isAnswerCorrect === null ? "thinking" : isAnswerCorrect ? "excited" : "sad")}
                </div>

                <h4 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-white text-center mb-8 max-w-3xl mx-auto">
                  {shuffledQuestions[currentQuestionIndex].question}
                </h4>

                {/* Choices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shuffledQuestions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrectChoice = idx === shuffledQuestions[currentQuestionIndex].correctAnswer;
                    
                    let btnStyle = "bg-slate-900/60 border-slate-800 text-slate-100 hover:border-emerald-500/40 hover:bg-slate-800/80";
                    let iconElement = <HelpCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />;

                    if (selectedAnswer !== null) {
                      if (isCorrectChoice) {
                        btnStyle = "bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-950/40";
                        iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />;
                      } else if (isSelected) {
                        btnStyle = "bg-red-950/80 border-red-500 text-red-200 shadow-md shadow-red-950/40 animate-shake";
                        iconElement = <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
                      } else {
                        btnStyle = "bg-slate-950/20 border-slate-900 text-slate-500 opacity-60";
                        iconElement = <HelpCircle className="w-5 h-5 text-slate-800 flex-shrink-0" />;
                      }
                    }

                    return (
                      <button
                        key={idx}
                        id={`btn-answer-choice-${idx}`}
                        disabled={isAnsweringLocked}
                        onClick={() => handleAnswerClick(idx)}
                        className={`w-full px-5 py-4 border-2 rounded-2xl flex items-start text-left cursor-pointer transition-all duration-300 disabled:cursor-not-allowed ${btnStyle} group`}
                      >
                        <span className="mr-3 mt-0.5">{iconElement}</span>
                        <span className="text-xs sm:text-sm font-semibold">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* EXPLANATION PANEL */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 border-t border-slate-900 pt-6"
                    >
                      <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isAnswerCorrect 
                          ? "bg-emerald-950/40 border border-emerald-500/20 text-emerald-300"
                          : "bg-red-950/30 border border-red-500/10 text-red-300"
                      }`}>
                        <div className="font-extrabold mb-1 flex items-center gap-1.5">
                          {isAnswerCorrect ? (
                            <>
                              <Sparkles className="w-4 h-4 text-yellow-400" />
                              <span>Đáp án chính xác! Thưởng may mắn mở khóa!</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              <span>Rất tiếc, bạn đã trả lời sai!</span>
                            </>
                          )}
                        </div>
                        <p className="text-slate-350">{shuffledQuestions[currentQuestionIndex].explanation}</p>
                      </div>

                      {/* Manual Next button if they failed the question */}
                      {!isAnswerCorrect && (
                        <div className="flex justify-end mt-4">
                          <button
                            id="btn-next-question-manual"
                            onClick={handleNextQuestion}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl active:scale-95 transition-all shadow-md cursor-pointer"
                          >
                            <span>Tiếp tục</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          )}

          {/* ================= LUCKY SPIN SLOT SCREEN ================= */}
          {gameState === "lucky_spin" && (
            <motion.div
              key="lucky_spin"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              {/* Slot instructions */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-yellow-950/60 border border-yellow-500/30 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400 animate-pulse" />
                  <span>Khu vực may mắn</span>
                </div>
                <h3 className="text-2xl font-black text-white">Quay Thưởng May Mắn</h3>
                <p className="text-xs text-emerald-400 font-medium">Bấm hoặc kéo cần gạt màu đỏ bên phải để quay slot!</p>
              </div>

              {/* ARCADE CABINET SLOT MACHINE VIEW */}
              <div className="bg-gradient-to-b from-amber-800 to-amber-950 border-4 border-amber-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col items-center">
                
                {/* Cabinet Header flashing lights */}
                <div className="absolute top-2 left-6 right-6 flex justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                </div>

                {/* Vine decorations on machine sides */}
                <div className="absolute -left-3 inset-y-10 text-emerald-600/40 pointer-events-none select-none text-3xl font-bold flex flex-col justify-around">
                  <span>🌿</span>
                  <span>🌿</span>
                </div>
                <div className="absolute -right-3 inset-y-10 text-emerald-600/40 pointer-events-none select-none text-3xl font-bold flex flex-col justify-around">
                  <span>🌿</span>
                  <span>🌿</span>
                </div>

                {/* Slot Machine Screen View */}
                <div className="w-full bg-slate-950 border-4 border-slate-900 rounded-2xl p-4 sm:p-6 mb-6 text-center shadow-inner flex flex-col items-center relative overflow-hidden">
                  
                  {/* Digital Marquee */}
                  <div className="bg-emerald-950 border border-emerald-800/40 text-emerald-400 px-4 py-1.5 rounded-md font-mono text-[10px] sm:text-xs uppercase tracking-widest font-black animate-pulse mb-6 w-full max-w-[200px]">
                    {isSpinning ? "SPINNING..." : "PULL LEVER!"}
                  </div>

                  {/* Character Expression inside machine screen */}
                  <div className="mb-4">
                    {renderMonkeyCharacter("excited")}
                  </div>

                  {/* Glass Reels Panel */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-emerald-950 flex items-center justify-center relative shadow-inner overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none z-10" />
                    
                    {/* Symbol Display */}
                    <motion.div
                      animate={isSpinning ? { 
                        scale: [1, 1.2, 0.9, 1.1, 1],
                        rotate: [0, 10, -10, 5, 0],
                      } : {}}
                      transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.15 }}
                      className="text-6xl sm:text-7xl font-bold filter drop-shadow-lg"
                    >
                      {reelSymbol}
                    </motion.div>
                  </div>
                </div>

                {/* SLOT CONTROLLER: LEVER INTERACTION */}
                <div className="relative w-full flex justify-center py-4">
                  
                  {/* Left Side dummy button */}
                  <div className="w-16 h-8 bg-amber-900 border border-amber-950 rounded-lg shadow-md flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* Machine Body Lever Joint */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                    {/* Metal slot attachment */}
                    <div className="w-6 h-10 bg-slate-700 border-2 border-slate-800 rounded-l-md shadow-md" />
                    
                    {/* The physical Lever Arm */}
                    <div className="relative h-20 w-8 flex justify-center">
                      <motion.div
                        onClick={handlePullLever}
                        style={{ originY: 0.8 }}
                        animate={isLeverPulled ? {
                          rotateX: [0, 45, 60, 45, 0],
                          scaleY: [1, 0.6, 0.4, 0.6, 1],
                        } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-3 bg-gradient-to-r from-slate-400 to-slate-200 border border-slate-500 rounded-full cursor-pointer hover:brightness-110 active:brightness-95 flex flex-col items-center justify-between"
                      >
                        {/* Red knob at the top */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-700 border-2 border-red-800 shadow-lg -mt-7 active:scale-95" />
                        
                        {/* Empty spacing for length */}
                        <div className="h-full" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Prompt Text Button to pull lever */}
                  <button
                    disabled={isLeverPulled}
                    onClick={handlePullLever}
                    className="px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-amber-950 font-black rounded-xl active:scale-95 shadow-lg border-2 border-amber-700 uppercase tracking-widest text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSpinning ? "Đang quay..." : "Gạt Cần Gạt"}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* ================= REWARD REVEAL PANEL ================= */}
          {gameState === "reward_reveal" && drawnReward && (
            <motion.div
              key="reward_reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto bg-slate-950/80 border-2 border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-t-3xl" />
              
              {/* Confetti sparkle overlay effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <span className="absolute top-4 left-6 text-yellow-500 text-sm animate-ping">✨</span>
                <span className="absolute top-10 right-8 text-yellow-500 text-sm animate-pulse">✨</span>
                <span className="absolute bottom-6 left-12 text-yellow-400 text-sm animate-pulse">✨</span>
              </div>

              {/* Monkey celebrates reward */}
              <div className="mb-6">
                {renderMonkeyCharacter("excited")}
              </div>

              {/* Reward Icon floating */}
              <motion.div
                initial={{ y: 20, scale: 0.5 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 mx-auto rounded-full bg-emerald-950/60 border-2 border-yellow-500/30 flex items-center justify-center text-5xl mb-6 shadow-lg shadow-emerald-950"
              >
                {drawnReward.icon}
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-black text-yellow-400 mb-2 uppercase tracking-wide">
                {drawnReward.name}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-350 mb-6 leading-relaxed">
                {drawnReward.description}
              </p>

              {/* Applied Effects indicators */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/10 rounded-2xl mb-8 flex justify-center gap-3">
                {drawnReward.effect.scoreBonus && (
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                    +{drawnReward.effect.scoreBonus * (1 + Math.floor(combo / 2))} điểm {combo > 1 && `(Combo x${1 + Math.floor(combo/2)})`}
                  </span>
                )}
                {drawnReward.effect.heartsBonus && (
                  <span className="text-xs font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-red-500 stroke-red-500" />
                    +{drawnReward.effect.heartsBonus} Tim
                  </span>
                )}
                {drawnReward.effect.shieldsBonus && (
                  <span className="text-xs font-bold text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-500/20 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 fill-sky-500 stroke-sky-500" />
                    +{drawnReward.effect.shieldsBonus} Khiên
                  </span>
                )}
                {drawnReward.type === "unlucky" && (
                  <span className="text-xs font-bold text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                    🍃 Vẫn vui vẻ nè
                  </span>
                )}
              </div>

              {/* Next Question flow trigger */}
              <button
                id="btn-confirm-reward"
                onClick={handleNextQuestion}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-sm tracking-wider rounded-2xl active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Tiếp tục câu hỏi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ================= GAME OVER SCREEN ================= */}
          {gameState === "game_over" && (
            <motion.div
              key="game_over"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-slate-950/70 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-center max-w-xl mx-auto"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-red-600 rounded-t-3xl" />
              
              {/* Crowned Monkey if they scored well, sad if failed */}
              <div className="mb-6">
                {renderMonkeyCharacter(score >= 120 ? "crowned" : score >= 60 ? "happy" : "sad")}
              </div>

              {score >= highScore && score > 0 ? (
                <div className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
                  <Award className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span>Kỷ lục mới thiết lập! 🏆</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Tổng kết cuộc thi</span>
                </div>
              )}

              <h3 className="text-3xl font-black mb-2 text-white">Kết Thúc Lượt Chơi!</h3>
              <p className="text-xs text-slate-400 mb-8 font-medium">
                {score >= 120 
                  ? "Bạn là chuyên gia xuất sắc môn Kinh tế chính trị! 👑" 
                  : score >= 60 
                    ? "Rất giỏi! Khỉ con rất vui vì sự thông thái của bạn. 🍌" 
                    : "Đừng buồn nha, hãy cùng ôn lại kiến thức Chương 5 và thử lại nhé! 💪"}
              </p>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-3 mb-8 text-center bg-slate-950/60 p-4 border border-emerald-500/10 rounded-2xl">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Điểm số</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{score}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Best Score</span>
                  <span className="text-xl sm:text-2xl font-black text-yellow-400">{highScore}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Combo Cao Nhất</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">🔥 {peakCombo}</span>
                </div>
              </div>

              {/* History of Drawn Rewards */}
              {rewardHistory.length > 0 && (
                <div className="mb-8 text-left">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">Lịch sử quà may mắn nhận được:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {rewardHistory.map((reward, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-emerald-950/30 border border-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1"
                        title={reward.name}
                      >
                        <span>{reward.icon}</span>
                        <span className="text-slate-350 text-[10px]">{reward.name.split(" ")[0]}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Retry Control Button */}
              <button
                id="btn-retry-game"
                onClick={handleStartGame}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-emerald-500 hover:from-yellow-400 hover:to-emerald-400 text-slate-950 font-black uppercase text-sm sm:text-base tracking-wider rounded-2xl active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Chơi lại vòng mới</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
