import { AnimatePresence, useAnimate, usePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";

export const VanishList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Take out trash",
      checked: false,
      time: "5 mins",
    },
    {
      id: 2,
      text: "Do laundry",
      checked: false,
      time: "10 mins",
    },
    {
      id: 3,
      text: "Have existential crisis",
      checked: true,
      time: "12 hrs",
    },
    {
      id: 4,
      text: "Get dog food",
      checked: false,
      time: "1 hrs",
    },
  ]);

  const handleCheck = (id) => {
    setTodos((pv) =>
      pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const removeElement = (id) => {
    setTodos((pv) => pv.filter((t) => t.id !== id));
  };

  return (
    <section
      className="min-h-screen py-6"

    >
      <div className="mx-auto w-full max-w-xl">
        <Header />
        <Todos
          removeElement={removeElement}
          todos={todos}
          handleCheck={handleCheck}
        />
      <Form setTodos={setTodos} />
      </div>
    </section>
  );
};

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval); 
  }, []); const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return "Good Morning! ☀️";
    if (hours < 18) return "Good Afternoon! 🌞";
    if (hours < 23) return "Good Evening! 🌇";
    return "Good Night! 🌙";
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-rose-700">{getGreeting()}</h1>
      <p className="text-zinc-900">{formatDate()}</p>
      <h1 className="text-xl text-rose-800">{formatTime()}</h1>
    </div>
  );
};

const Form = ({ setTodos }) => {
  const [visible, setVisible] = useState(false);

  const [time, setTime] = useState(5);
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("mins");

  const handleSubmit = () => {
    if (!text.length) {
      return;
    }

    setTodos((pv) => [
      {
        id: Math.random(),
        text,
        checked: false,
        time: `${time} ${unit}`,
      },
      ...pv,
    ]);

    setTime(15);
    setText("");
    setUnit("mins");
  };

  return (
    <div className="fixed bottom-6  w-full sm:max-w-xl max-w-md">
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mb-6 w-full rounded border border-zinc-700 bg-[#e0f4fe] p-3"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you need to do?"
              className="h-24 w-full resize-none rounded bg-[#f0faff] p-3 text-sm text-[#05709f] placeholder-zinc-500 caret-zinc-50 focus:outline-0"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  className="w-24 rounded bg-[#b4e7fc] px-1.5 py-1 text-sm border border-[#05709f] text-[#05709f] focus:outline-0"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => setUnit("mins")}
                  className={`rounded px-1.5 py-1 text-xs ${unit === "mins" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-500 transition-colors hover:bg-[#7ed9fb] hover:text-[#085f84]"}`}
                >
                  mins
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("hrs")}
                  className={`rounded px-1.5 py-1 text-xs ${unit === "hrs" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-500 transition-colors hover:bg-[#7ed9fb] hover:text-[#085f84]"}`}
                >
                  hrs
                </button>
              </div>
              <button
                type="submit"
                className="rounded bg-[#048dc5] px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((pv) => !pv)}
        className="grid w-full place-content-center rounded-xl border border-[#10afe7] bg-[#e0f4fe] py-3 text-lg text-[#048dc5] transition-colors hover:bg-[#7ed9fb] active:text-[#e0f4fe] active:bg-[#048dc5]"
      >
        <FiPlus
          className={`transition-transform ${visible ? "rotate-45" : "rotate-0"}`}
        />
      </button>
    </div>
  );
};

const Todos = ({ todos, handleCheck, removeElement }) => {
  return (
    <div className="w-full space-y-3">
      <AnimatePresence>
        {todos.map((t) => (
          <Todo
            handleCheck={handleCheck}
            removeElement={removeElement}
            id={t.id}
            key={t.id}
            checked={t.checked}
            time={t.time}
          >
            {t.text}
          </Todo>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Todo = ({ removeElement, handleCheck, id, children, checked, time }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: checked ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: checked ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-center gap-3 rounded border border-rose-700 bg-[#e6d4ef] p-3"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id)}
        className="size-4 accent-rose-800"
      />

      <p
        className={`text-gray-700 transition-colors ${checked && "text-rose-600"}`}
      >
        {children}
      </p>
      <div className="ml-auto flex gap-1.5">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded px-1.5 py-1 text-xs text-zinc-900">
          <FiClock />
          <span>{time}</span>
        </div>
        <button
          onClick={() => removeElement(id)}
          className="rounded bg-red-500/20 px-1.5 py-1 text-xs text-red-500 transition-colors hover:bg-red-600 hover:text-red-200"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};