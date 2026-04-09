import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  AnimatePresence,
  type AnimatePresenceProps,
  motion,
  type MotionProps,
  type Transition,
} from 'motion/react'

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: MotionProps['initial']
  animate?: MotionProps['animate']
  exit?: MotionProps['exit']
  animatePresenceMode?: AnimatePresenceProps['mode']
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | number | 'random'
  transition?: Transition
  loop?: boolean
  auto?: boolean
  splitBy?: 'words' | 'characters' | 'lines' | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const segmenter = new (Intl as any).Segmenter('pt', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), ({ segment }: { segment: string }) => segment)
  }
  return Array.from(text)
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.025,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex]
      if (splitBy === 'characters') {
        const words = currentText.split(' ')
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }))
      }
      if (splitBy === 'words') return currentText.split(' ')
      if (splitBy === 'lines') return currentText.split('\n')
      return currentText.split(splitBy)
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        if (staggerFrom === 'first') return index * staggerDuration
        if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration
        if (staggerFrom === 'center') {
          const center = Math.floor(totalChars / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === 'random') {
          return Math.floor(Math.random() * totalChars) * staggerDuration
        }
        return Math.abs(staggerFrom - index) * staggerDuration
      },
      [staggerFrom, staggerDuration]
    )

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex)
        onNext?.(newIndex)
      },
      [onNext]
    )

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop ? 0 : currentTextIndex
          : currentTextIndex + 1
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop ? texts.length - 1 : currentTextIndex
          : currentTextIndex - 1
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1))
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex)
      },
      [texts.length, currentTextIndex, handleIndexChange]
    )

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0)
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ])

    useEffect(() => {
      if (!auto) return
      const id = setInterval(next, rotationInterval)
      return () => clearInterval(id)
    }, [next, rotationInterval, auto])

    return (
      <motion.span
        className={`inline-flex flex-wrap whitespace-pre-wrap overflow-hidden ${mainClassName ?? ''}`}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className={`inline-flex flex-wrap ${splitBy === 'lines' ? 'flex-col w-full' : ''}`}
            layout
            aria-hidden="true"
          >
            {(splitBy === 'characters'
              ? (elements as WordObject[])
              : (elements as string[]).map((el, i) => ({
                  characters: [el],
                  needsSpace: i !== elements.length - 1,
                }))
            ).map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, w) => sum + w.characters.length, 0)
              const totalChars = array.reduce((sum, w) => sum + w.characters.length, 0)

              return (
                <span key={wordIndex} className={`inline-flex ${splitLevelClassName ?? ''}`}>
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(previousCharsCount + charIndex, totalChars),
                      }}
                      className={`inline-block ${elementLevelClassName ?? ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    )
  }
)

TextRotate.displayName = 'TextRotate'
export { TextRotate }
