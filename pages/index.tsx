import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/hljs/xcode";
import { useEffect, useState } from "react";

const TS: React.FC = ({ children }) => {
  return (
    <SyntaxHighlighter
      customStyle={{ display: "inline-block", padding: 0, fontSize: "14px" }}
      language="typescript"
      style={style}
    >
      {children}
    </SyntaxHighlighter>
  );
};

type Question =
  | {
      question: JSX.Element;
      answer: JSX.Element;
    }
  | {
      section: string;
    };

const questions: Question[] = [
  {
    question: <p>Hello!</p>,
    answer: <p>Hi!</p>,
  },
  {
    question: <p>Have you read the little schemer or the little typer?</p>,
    answer: <p>No...</p>,
  },
  {
    question: <p>Have you used Typescript?</p>,
    answer: <p>I have! but I am not sure if I understand it well.</p>,
  },
  {
    question: <p>{"Let's play around with it a bit!"}</p>,
    answer: <p>Ok!</p>,
  },

  {
    section: "Basic ingredients!",
  },

  {
    question: (
      <p>
        {"What's the type of "}
        <code>42</code>?
      </p>
    ),
    answer: (
      <p>
        {"That's easy! It's"} <code>number</code>.
      </p>
    ),
  },

  {
    question: <p>{"Is it the only valid type?"}</p>,
    answer: (
      <p>
        {"It could also be "} <code>number | undefined</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        {"What is a value of type "}
        <code>null</code>?
      </p>
    ),
    answer: (
      <p>
        <code>null</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        {"How many values have type  "}
        <code>null</code>?
      </p>
    ),
    answer: (
      <p>
        Just one: <code>null</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        {"Is there a type that has  "}
        <code>42</code> as its only value?
      </p>
    ),
    answer: <p>{`I don't know.`}</p>,
  },

  {
    question: (
      <p>
        <code>42</code> is also valid type. So are most literal values.
        <br />
        <TS>{`const x: 42 = 42;  // ok
const x: 42 = 41;  // error
`}</TS>
      </p>
    ),
    answer: (
      <p>
        {`Oh! so it works for `} <code>true, false, "potato"</code>.
      </p>
    ),
  },

  {
    question: (
      <p>Indeed! They accept the corresponding type as a value only.</p>
    ),
    answer: <p>{`Cool. `}</p>,
  },

  {
    question: (
      <p>
        What are some values of the type <code>{`{ x: null }`}</code> ?
      </p>
    ),
    answer: (
      <p>
        As before, <code>{`{x: null }`}</code>.
      </p>
    ),
  },

  {
    question: <p>Is there any other value with that type??</p>,
    answer: <p>It should not...?</p>,
  },

  {
    question: (
      <p>
        Well, <code>{`{ x: null, y: 0}`}</code> is also a valid value for that
        type.
      </p>
    ),
    answer: <p>How?</p>,
  },

  {
    question: (
      <p>
        You should read interface types as "at least those properties". But it
        might have more!
      </p>
    ),
    answer: <p>I see!</p>,
  },

  {
    question: <p>Are there other ways to create compound types?</p>,
    answer: <p>Maybe?</p>,
  },

  {
    question: (
      <p>
        Typescript also supportt tuples.
        <TS>{`type T = [boolean, boolean]`}</TS>
      </p>
    ),

    answer: (
      <p>
        Let me guess, <code>[true, false]</code> has that type.
      </p>
    ),
  },

  {
    question: <p>You are learning fast!</p>,
    answer: <div />,
  },

  {
    question: <p>How many values have this type?</p>,
    answer: <p>4.</p>,
  },

  {
    question: (
      <p>
        Finally, you can also type functions, for example
        <br />
        <br />
        <TS>{`type T = (x: number) => number`}</TS>
        <br />
        <br />
        or
        <br />
        <br />
        <TS>{`function f (x: number): number { ... }`}</TS>
      </p>
    ),

    answer: <p>I knew that.</p>,
  },

  {
    section: "Combining ingredients",
  },

  {
    question: (
      <p>
        What are some values for the type <code>string | number</code>?
      </p>
    ),
    answer: (
      <p>
        <code>1</code>, <code>24</code>, and <code>"blueberry"</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        What about type <TS>{`type T = string & number`}</TS>?
      </p>
    ),
    answer: (
      <p>
        That is impossible. There is no value that is both a string and a value.
      </p>
    ),
  },

  {
    question: <p>So, how many values have that that type?</p>,
    answer: <p>Zero.</p>,
  },

  {
    question: (
      <p>
        Exactly. The type <code>never</code> has also zero values.
      </p>
    ),
    answer: <p>{`I don't see how that could be useful.`}</p>,
  },

  {
    question: (
      <p>
        What is a valid value for the type{" "}
        <TS>{`type T = {x: number} | {y: number}`}</TS>
      </p>
    ),
    answer: (
      <p>
        <TS>{`const obj: T = {x: 1}`}</TS>
      </p>
    ),
  },

  {
    question: (
      <p>
        What is a valid value for the type{" "}
        <TS>{`type T = {x: number} & {y: number}`}</TS>
      </p>
    ),
    answer: (
      <p>
        <TS>{`const obj: T = {x: 1, y: 3}`}</TS>
      </p>
    ),
  },

  {
    question: (
      <p>
        What is a valid value for the type{` `}
        <TS>{`type T = {x: number} & {x: string}`}</TS>
      </p>
    ),
    answer: <p>That is impossible as well.</p>,
  },
];

const Home: NextPage = () => {
  const [step, setStep] = useState(0);

  const [highlights, setHighlights] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("step");
    if (raw) {
      setStep(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setHighlights([]);
    localStorage.setItem("step", JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      console.log(e);
      switch (e.key) {
        case " ":
        case "ArrowRight":
          setStep((s) => Math.min(questions.length * 2 - 1, s + 1));
          return;
        case "Backspace":
        case "ArrowLeft":
          setStep((s) => Math.max(0, s - 1));
          return;
      }
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const questionNumber = (step / 2) | 0;
  const isAnswer = step % 2 === 1;

  console.log({ step, questionNumber, isAnswer });

  return (
    <div className={styles.container}>
      <Head>
        <title>The Little Typescripter</title>
        <meta name="description" content="The Little Typescripter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Little Typescripter</h1>

        <br />
        <br />

        {questions.slice(0, questionNumber + 1).map((item, currentQuestion) => {
          if ("section" in item) {
            return <h2>{item.section}</h2>;
          } else {
            const { question, answer } = item;
            const pastQuestion = currentQuestion < questionNumber;
            return (
              <Question
                key={currentQuestion}
                index={currentQuestion}
                question={question}
                showAnswer={
                  currentQuestion < questionNumber ||
                  (currentQuestion === questionNumber && isAnswer)
                }
                answer={answer}
                past={pastQuestion && !highlights.includes(currentQuestion)}
                onClick={() => {
                  setHighlights((a) => [...a, currentQuestion]);
                }}
              />
            );
          }
        })}
      </main>
    </div>
  );
};

interface QuestionProps {
  index: number;
  question: JSX.Element;
  answer: JSX.Element;
  showAnswer: boolean;
  past: boolean;
  onClick: () => void;
}

function Question({
  index,
  question,
  answer,
  showAnswer,
  past,
  onClick,
}: QuestionProps) {
  return (
    <div className="row" onClick={onClick}>
      <div className="index">{index}</div>
      <div className="question">{question}</div>
      <div className="answer">{showAnswer && answer}</div>
      <style jsx>
        {`
          .row {
            display: flex;
            width: 100%;
            border-bottom: 1px solid #e8e8e8;
            min-height: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            opacity: ${past ? 0.3 : 1};
            gap: 20px;
          }

          .question,
          .answer {
            width: 100%;
          }

          .index {
            position: "absolute";
            left: 0;
            top: 0;
            font-size: 0.7em;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
