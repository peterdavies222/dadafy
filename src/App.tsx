import "./app.css";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { shuffle } from "./helpers";

export default function App() {
  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [spanWidth, setSpanWidth] = useState<number | null>(null);
  const [output, setOutput] = useState<null | React.JSX.Element[]>(null);
  const [outputHeight, setOutputHeight] = useState<null | number>(null);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const outputPRef = useRef<HTMLParagraphElement | null>(null);

  const inputStyles = {
    "--max-height": showAll
      ? `calc(${inputRef.current?.scrollHeight}px - 2 * var(--padding))`
      : "15em",
  } as React.CSSProperties;

  const buttonStyles = {
    "--width": spanWidth ? `${spanWidth}px` : "unset",
  } as React.CSSProperties;

  const outputStyles = {
    "--children-count": output?.length ?? 0,
    "--output-height": outputHeight ?? 0,
  } as React.CSSProperties;

  useEffect(() => {
    const outputP = outputPRef.current;
    if (outputP) {
      const height = outputP.getBoundingClientRect().height;
      setOutputHeight(height);
    } else {
      setOutputHeight(0);
    }
  }, [setOutputHeight, outputPRef.current, output]);

  useLayoutEffect(() => {
    const span = spanRef.current;
    if (span) {
      setSpanWidth(span.getBoundingClientRect().width);
    }
  }, [spanRef.current, showAll, setSpanWidth]);

  useEffect(() => {
    if (!showAll && inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [showAll, inputRef.current]);

  function dadify() {
    if (input.trim().length === 0) return;
    const splitInput = input.split(" ");
    const shuffled = shuffle(splitInput);
    const spanEls = shuffled.map((word, index) => {
      const spanStyle = { "--index": index } as React.CSSProperties;
      return (
        <span style={spanStyle} key={crypto.randomUUID()}>
          {`${word} `}
        </span>
      );
    });
    setOutput(spanEls);
  }

  return (
    <div className="app-container">
      <h1>Let's scramble some text</h1>
      <div className="input-container">
        <div className="input-header">
          <label htmlFor="text-input">Virgin paragraph</label>
          <button
            style={buttonStyles}
            className="show-all-btn"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span ref={spanRef}>
              {showAll ? "Showing full text" : "Show full text"}
            </span>
          </button>
        </div>
        <textarea
          style={inputStyles}
          ref={inputRef}
          name="text-input"
          id="text-input"
          placeholder="Paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="shuffle" onClick={dadify}>
          <div className="text-container">
            <div className="shuffle-text-hover-container">
              <span className="shuffle-text-hover" aria-hidden="true">
                Dadafy!
              </span>
            </div>
            <span className="shuffle-text-primary">Dadafy!</span>
          </div>
        </button>
      </div>
      {output && (
        <div style={outputStyles} className="output-container">
          <p ref={outputPRef} className="output">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}
