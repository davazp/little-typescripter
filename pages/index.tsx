import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/hljs/xcode";
import { useCallback, useEffect, useState } from "react";
import { createRouteLoader } from "next/dist/client/route-loader";

const presenterMode = (() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    return params.get("presenter") !== null ? true : false;
  } else {
    return false;
  }
})();

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
    question: (
      <p>
        Have you read <em>The Little Schemer</em> or <em>The Little Typer</em>?
      </p>
    ),
    answer: <p>No...</p>,
  },
  {
    question: <p>Have you used TypeScript?</p>,
    answer: <p>I have! But I am not sure if I understand it well.</p>,
  },
  {
    question: <p>Have you have dinner yet?</p>,
    answer: <p>No, {`I'm not `} hungry yet.</p>,
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
        {"That's easy as pie! It's"} <code>number</code>.
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
        {`Oh! So it works for `} <code>true, false, "potato"</code>.
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
    question: <p>Is there any other value with that type?</p>,
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
        TypeScript also supports tuples.
        <br />
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
        That is impossible. There is no value that is both a <code>string</code>{" "}
        and a <code>number</code>.
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
        What type is <code>string | never</code> equal to?
      </p>
    ),
    answer: (
      <p>
        <code>string</code>
        {`. Because any value with that type, must be of type `}{" "}
        <code>string</code>.
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
        Is <TS>{`{x: 1, y: 2}`}</TS> a valid value for that type?
      </p>
    ),
    answer: <p>Yes</p>,
  },

  {
    question: (
      <p>
        <TS>
          {`
type T = {x: number, z: number}
       | {y: number, z: number}

const obj: T = {x: 1, y: 2}
`}
        </TS>{" "}
        <br /> Is this valid?
      </p>
    ),
    answer: (
      <p>
        No. It fails. Because the value does not belong to any of the individual
        types.
      </p>
    ),
  },

  {
    question: (
      <p>
        <TS>
          {`type T = {x: number} | {y: number}
const obj: T = {x: 1, y: 2}
`}
        </TS>{" "}
        <br /> Why is this valid?
      </p>
    ),
    answer: (
      <p>
        <code>obj</code> is a valid value for both <code>{`{x: number}`}</code>
        <br /> and <code>{`{y: number}`}</code>, so it must be also in the
        union.
      </p>
    ),
  },

  {
    question: (
      <p>
        Why is it valid
        <br />
        <TS>
          {`
type T = {x: number, z: number}
       | {y: number, z: number}

const obj: T = {x: 1, y: 2, z: 0}
`}
        </TS>
        ?
      </p>
    ),
    answer: (
      <p>
        <code>obj</code> is a valid value for both types so it must be also in
        the union.
      </p>
    ),
  },

  {
    section: "Bread or Butter",
  },

  {
    question: (
      <p>
        {`Let's go shopping`}
        <br />
        <TS>
          {`
type Bread = {
  type: 'sour' | 'corn' | 'brioche',
  weight: number
}

type Butter = { salty: boolean }

type SideDish = Bread | Butter

`}
        </TS>
      </p>
    ),
    answer: (
      <p>
        Got it. Should I refrigate it?
        <br />
        <br />
        <TS>{`function refrigerate (x: Bread | Butter) {
  // ...
}`}</TS>
      </p>
    ),
  },

  {
    question: (
      <p>
        You can use regular control flow `(if, throw, ...)` to{" "}
        <b>refine the type</b>
      </p>
    ),
    answer: <p>Can you show me an example?</p>,
  },

  {
    question: (
      <p>
        <TS>{`function refrigerate (x: Bread | Butter) {
  if ('type' in x) {
    // x is now type Bread
  } else {
    // x is now type Butter
  }
}`}</TS>
      </p>
    ),

    answer: <p>{`That's useful. Now I know.`}</p>,
  },

  {
    question: (
      <p>
        There is a problem with this code, though. <br />
        Can you find some <b>butterbread</b>?
      </p>
    ),
    answer: (
      <p>
        Oops. I found this <br />
        <br />
        <TS>{`const butterbread: Butter & Bread = {
  type: 'sour',
  weight: 500,
  salty: false
}`}</TS>{" "}
        <br />
        <br />
        Looks awful.
      </p>
    ),
  },

  {
    question: <p>Can you fix the definitions to prevent this?</p>,
    answer: <p>Let me think</p>,
  },

  {
    question: <p></p>,
    answer: (
      <p>
        I think I fixed it!
        <br />
        <br />
        <TS>{`
type Bread = {
  food: 'bread',// <-----
  type: 'sour' | 'corn' | 'brioche',
  weight: number
}

type Butter = {
  food: 'butter',// <-----
  salty: boolean
}

type SideDish = Bread | Butter
`}</TS>
      </p>
    ),
  },

  {
    question: <p>Excellent! Can you explain why it works?</p>,
    answer: (
      <p>
        {`Because it is imposible to have a value that is `}
        <code>Bread & Butter</code>, <br />
        because <code>food</code> would have type <code>never</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        This pattern is called <b>discriminated union</b>.<br />
        <br />
        Now Enjoy your <code>[Bread, Butter]</code>.
      </p>
    ),
    answer: <p></p>,
  },

  {
    section: "Generics",
  },

  {
    question: (
      <p>
        What is a good type for <br />
        <br />
        <TS>{`function id (x) { return x }`}</TS>
      </p>
    ),
    answer: (
      <p>
        hm... <br />
        <br />
        <TS>{`function id (x: number): number {
  return x;
}
  `}</TS>
        ?
      </p>
    ),
  },

  {
    question: (
      <p>
        Well, <code>x</code> could be as well a string for example, right?
      </p>
    ),
    answer: (
      <p>
        what about <br />
        <br />
        <TS>{`function id (x: number | string): number | string {
  return x;
}
`}</TS>
        ?
      </p>
    ),
  },

  {
    question: (
      <p>Does this type guarantee the same type as the argument is returned?</p>
    ),
    answer: (
      <p>
        Not really <br />
        <br />
        <TS>{`function id (x: number | string): number | string {
  return "foo";
}
`}</TS>
        <br />
        For example, this implementation returns a string even if the argument
        is number.
      </p>
    ),
  },

  {
    question: (
      <p>
        <b>Generic</b> parameters introduce type variables that solve this
        issue.
        <br />
        <br />
        <TS>{`function id<T>(x: T): T {
  return x;
}`}</TS>
      </p>
    ),
    answer: <p>I see. Now the return type is always the same as the input.</p>,
  },

  {
    question: <p>How many functions have the same type?</p>,
    answer: <p>Depends how you consider two functions the same.</p>,
  },
  {
    question: (
      <p>
        How many functions have the type <br />
        <br />
        <TS>{`function f<T>(x: number): T { ... }`}</TS> <br />?
      </p>
    ),
    answer: (
      <p>None? How can we return something of a type we don't know or have?</p>
    ),
  },

  { section: "The Promise of Pizza" },

  {
    question: <p>Time to order some pizza!</p>,
    answer: <p>Sounds simple enough.</p>,
  },
  {
    question: (
      <p>
        Let's start with placing the order. What does <code>fetch()</code>{" "}
        return?
      </p>
    ),
    answer: (
      <p>
        It's a <code>Promise</code>
      </p>
    ),
  },
  {
    question: (
      <p>
        Indeed! But what is inside of that <code>Promise</code> wrapper?
      </p>
    ),
    answer: (
      <p>
        It depends on what is being fetched, so <code>{"Promise<any>"}</code>
      </p>
    ),
  },
  {
    question: (
      <p>
        What if we specifically call <code>fetch("UberEats/pizza")</code>?
      </p>
    ),
    answer: (
      <p>
        Then we can narrow it down to <code>{"Promise<Pizza>"}</code>
      </p>
    ),
  },
  {
    question: (
      <p>
        So this should work now:
        <br />
        <TS>{`
  function getPizza(): Promise<Pizza> {
    return fetch("UberEats/pizza")
  }

  function eatPizza(bite: Pizza): void {
    console.log("Nom!")
  }

  const pizza = await getPizza()
  eatPizza(pizza)`}</TS>
      </p>
    ),
    answer: <p>Looks good to me!</p>,
  },
  {
    question: <p>What if the restaurant mixes up your order?</p>,
    answer: <p>No worries, it's all type checked!</p>,
  },
  {
    question: <p>Does TS also check it at run-time?</p>,
    answer: <p>I guess not... So the types are useless?</p>,
  },
  {
    question: <p>Or maybe we used the wrong type?</p>,
    answer: <p>Yes, but we don't really know what type it will be</p>,
  },
  {
    question: (
      <p>
        What if we consider the type to be <code>unknown</code> explicitly?
        <br />
        <TS>{`
  function getPizzaHopefully(): Promise<unknown> {
    return fetch("UberEats/pizza")
  }`}</TS>
      </p>
    ),
    answer: (
      <p>
        I suppose... But how can we do anything with an <code>unknown</code>{" "}
        value?
      </p>
    ),
  },
  {
    question: (
      <p>
        Good question! What if we had a function like this:
        <br />
        <TS>{`
  function smellsLikePizza(thing: unknown): boolean {
    // nose-related code
  }`}</TS>
        <br />
        <br />
        Could you use this to call <code>eatPizza()</code> safely?
      </p>
    ),
    answer: (
      <p>
        Of course! We can validate the result first:
        <br />
        <TS>{`
  if (smellsLikePizza(thing)) {
    eatPizza(thing)
  }
  `}</TS>
      </p>
    ),
  },
  {
    question: <p>Looks good! Does it also pass the type-check?</p>,
    answer: (
      <p>
        No... <code>thing</code> is still <code>unknown</code>
      </p>
    ),
  },
  {
    question: <p>Any idea how to make it work?</p>,
    answer: (
      <p>
        Well, I'm pretty sure it is <code>Pizza</code>, so I could just manually
        cast the type:
        <br />
        <TS>{`
  if (smellsLikePizza(thing)) {
    const pizza = thing as Pizza
    eatPizza(pizza)
  }
  `}</TS>
        <br />
        <br />
      </p>
    ),
  },
  {
    question: (
      <p>
        That works! But the type cast is not very elegant. How about we make TS
        understand what <code>smellsLikePizza</code> is doing?
      </p>
    ),
    answer: <p>Sound good, but how?</p>,
  },
  {
    question: (
      <p>
        We can create our own type guard:
        <br />
        <TS>{`
  function smellsLikePizza(thing: unknown): thing is Pizza {
    // the same nose-related code
  }`}</TS>
      </p>
    ),
    answer: (
      <p>
        Cool! So now this should work again
        <br />
        <TS>{`
  if (smellsLikePizza(thing)) {
    eatPizza(thing)
  }
  `}</TS>
      </p>
    ),
  },
  {
    question: (
      <p>
        Let's go a bit further! Can you create a function{" "}
        <TS>{`(thing: unknown) => Pizza`}</TS>?
      </p>
    ),
    answer: (
      <p>
        No?! You can't turn <em>everything</em> into Pizza
      </p>
    ),
  },
  {
    question: (
      <p>
        Would this do the trick?
        <br />
        <TS>{`
  function ensureItsPizza(thing: unknown): Pizza {
    if (smellsLikePizza(thing)) {
      return thing
    } else {
      throw new Error("Someone messed up!")
    }
  }

  eatPizza(ensureItsPizza(thing))
  `}</TS>
      </p>
    ),
    answer: <p>I see, the Error prevents us from eating the wrong order</p>,
  },
  {
    question: (
      <p>
        Exactly. Can you now rewrite our <code>getPizza()</code> to always
        deliver Pizza?
      </p>
    ),
    answer: (
      <p>
        Easy!
        <br />
        <TS>{`
  async function getPizza(): Promise<Pizza> {
    const thing: unknown = await fetch("UberEats/pizza")
    const pizza: Pizza = ensureItsPizza(thing)
    return pizza
  }`}</TS>
      </p>
    ),
  },
  {
    question: (
      <p>
        That <code>ensureItsPizza</code> is called a <strong>Decoder</strong>.
        <br />
        Libraries like <a href="https://github.com/gcanti/io-ts">io-ts</a> help
        you create them more easily!
      </p>
    ),
    answer: <p>:)</p>,
  },

  {
    section: "Fine dining type-level dessert",
  },

  {
    question: <p>Oh, you are still there!</p>,
    answer: <p>Of course!</p>,
  },

  {
    question: <p>{`It's time for some dessert.`}</p>,
    answer: <p>What do you have?</p>,
  },

  {
    question: <p>It depends. Do you have any allergies</p>,
    answer: (
      <p>
        <TS>{`type Allergies = 'almond' | 'egg'`}</TS>
      </p>
    ),
  },

  {
    question: (
      <p>
        What is a value for
        <br />
        <TS>{`
const x: Safe<"chocolate"> = ...
`}</TS>
      </p>
    ),
    answer: <p>true?</p>,
  },

  {
    question: (
      <p>
        What is a value for
        <br />
        <TS>{`
const x: Safe<"egg"> = ...
`}</TS>
      </p>
    ),
    answer: <p>false.</p>,
  },

  {
    question: (
      <p>
        What is a value for
        <br />
        <TS>{`
const x: Safe<"egg" | "chocolate"> = ...
`}</TS>
      </p>
    ),
    answer: <p>It depends?.</p>,
  },

  {
    question: (
      <p>
        Type parameters in conditionals that are not wrapped are <b>naked</b>.
      </p>
    ),
    answer: <p>How is that releated to my dessert?</p>,
  },

  {
    question: <p>Naked type parameters distribute over union.</p>,
    answer: <p>I am still lost.</p>,
  },

  {
    question: (
      <p>
        What is a value for
        <br />
        <TS>{`
type T = Safe<"egg" | "chocolate">
`}</TS>
        <br /> must be equal to <br />
        <TS>{`
type T = Safe<"egg"> | Safe<"chocolate">
`}</TS>
      </p>
    ),
    answer: (
      <p>
        I see. Then I can evaluate each Safe individually to get{" "}
        <code>boolean</code>.
      </p>
    ),
  },

  {
    question: (
      <p>
        Exactly <br />
        <TS>{`
type T = Safe<"egg"> | Safe<"chocolate">

type T =       false |              true
`}</TS>
        <br />
      </p>
    ),
    answer: <p>It makes sense, I guess.</p>,
  },

  {
    section: "Conditional Persimmon & Recursive Parsley",
  },
  {
    question: <p>We can leave this for another time!</p>,
    answer: <p></p>,
  },

  {
    section: "Spicy Curry at Howard's",
  },
  {
    question: <p>We can leave this for another time!</p>,
    answer: <p></p>,
  },

  {
    section: "Enjoy your food!",
  },
];

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  const [highlights, setHighlights] = useState<number[]>([]);

  const reload = useCallback(() => {
    const raw = localStorage.getItem("step");
    if (raw) {
      setStep(JSON.parse(raw));
    }
    const rawHighlight = localStorage.getItem("highlights");
    if (rawHighlight) {
      setHighlights(JSON.parse(rawHighlight));
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setHighlights([]);
    localStorage.setItem("step", JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem("highlights", JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      switch (e.key) {
        case " ":
        case "ArrowRight":
          setStep((s) => Math.min(questions.length * 2 - 1, s + 1));
          return;
        case "Backspace":
        case "ArrowLeft":
          setStep((s) => Math.max(0, s - 1));
          return;
        case "Home":
          setStep(0);
          return;
      }
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    function handler() {
      reload();
    }
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  }, [reload]);

  useEffect(() => {
    function handler() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
    document.addEventListener("dblclick", handler);
    return () => document.removeEventListener("dblclick", handler);
  }, []);

  const questionNumber = (step / 2) | 0;
  const isAnswer = step % 2 === 1;

  return (
    <div className={styles.container}>
      <Head>
        <title>The Little TypeScripter</title>
        <meta name="description" content="The Little TypeScripter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Little TypeScripter</h1>

        <br />
        <br />

        {questions
          .slice(0, questionNumber + 1 + (presenterMode ? 1 : 0))
          .map((item, currentQuestion) => {
            if ("section" in item) {
              return <h2>{item.section}</h2>;
            } else {
              const { question, answer } = item;
              const pastQuestion = currentQuestion < questionNumber;
              const futureQuestion = currentQuestion > questionNumber;

              const style = {
                width: "100%",
                ...(futureQuestion
                  ? { backgroundColor: "#e5e5e5", opacity: 0.5 }
                  : {}),
              };

              return (
                <div style={style}>
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
                </div>
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
      <div
        className="answer"
        style={{ opacity: showAnswer ? 1 : presenterMode ? 0.1 : 0 }}
      >
        {answer}
      </div>
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
