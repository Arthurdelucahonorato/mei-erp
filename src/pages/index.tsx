import { Button } from "@/components/Button";
import Bolo1 from "@/assets/boloChocolateMorango.jpeg";
import Image from "next/image";
import { BsMap, BsBasket, BsCalendar3 } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  const titleVariants = {
    initial: {
      x: "100%", // Começa fora da tela à direita
      opacity: 0,
    },
    animate: {
      x: 0, // Move para o centro da tela
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const squareVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    hidden: { opacity: 0, x: -50 },
  };

  const [ref, inView] = useInView();

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col bg-red-50">
      <section className="flex flex-col h-screen">
        <div className="relative w-full left-0 overflow-hidden top-0 h-screen bg-[url('../assets/homeBackground.jpg')] bg-no-repeat bg-center bg-cover">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute flex flex-1 pt-[88px] w-full h-full justify-center text-white backdrop-brightness-95 bg-black bg-opacity-50"
          >
            <div className="flex flex-col justify-center items-center mx-48 mb-14 gap-10">
              <motion.h1
                initial="initial"
                animate="animate"
                variants={titleVariants}
                className="font-bold text-8xl text-center"
              >
                Algum Titulo Aqui
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="font-semibold text-lg text-center"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </motion.p>
              <div className="flex w-full max-w-xl mx-auto justify-center flex-col md:flex-row gap-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <Button>Cardápio</Button>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <Button variant="ghost">Faça um pedido</Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute w-full left-0 bottom-0 overflow-hidden border-white border-b-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              className="fill-white"
              d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
            ></path>
          </svg>
        </div>
      </section>
      <section className="flex items-center flex-col w-screen bg-gray-100">
        <div className="flex flex-col lg:flex-row flex-1 gap-16 my-20">
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={squareVariants}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex flex-1 items-center flex-col max-w-xs gap-5"
          >
            <Image
              src={Bolo1}
              alt="bolo"
              className="rounded-full aspect-square object-cover max-w-[15rem] "
            />
            <h3 className="text-2xl font-bold text-primary">Algum texto</h3>
            <p className="text-base font-sans text-black text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={squareVariants}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-1 items-center flex-col max-w-xs gap-5 mt-28"
          >
            <Image
              src={Bolo1}
              alt="bolo"
              className="rounded-full aspect-square object-cover max-w-[15rem] "
            />
            <h3 className="text-2xl font-bold text-primary">Algum texto</h3>
            <p className="text-base font-sans text-black text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={squareVariants}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-1 items-center flex-col max-w-xs gap-5"
          >
            <Image
              src={Bolo1}
              alt="bolo"
              className="rounded-full aspect-square object-cover max-w-[15rem] "
            />
            <h3 className="text-2xl font-bold text-primary">Algum texto</h3>
            <p className="text-base font-sans text-black text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="flex flex-1 bg-gray-300">
        <div className="flex flex-col lg:flex-row w-full p-20 gap-20 bg-[url('../assets/instBackground.png')] bg-no-repeat bg-center bg-cover">
          <div className="flex flex-1 flex-col gap-10">
            <h2 className="flex text-6xl font-semibold text-white text-center lg:text-left">
              Gostou dos nossos produtos?
            </h2>
            <h4 className="font-semibold text-white text-center lg:text-left">
              Segue o passo a passo então...
            </h4>
          </div>

          <div className="flex flex-1 flex-col justify-center items-center gap-6 text-white">
            <div className="bg-primary p-10 rounded-full">
              <BsMap className="text-6xl"></BsMap>
            </div>
            <h4 className="font-bold text-white text-2xl text-center">
              Escolha os produtos no cardápio online
            </h4>
            <h5 className="font-bold text-white text-sm">{"-->"}</h5>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-6 text-white">
            <div className="bg-primary p-10 rounded-full">
              <BsBasket className="text-6xl"></BsBasket>
            </div>
            <h4 className="font-bold text-white text-2xl  text-center">
              Faça seu pedido e aguarde a confirmação
            </h4>
            <h5 className="font-bold text-white text-sm">{"-->"}</h5>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center gap-6 text-white">
            <div className="bg-primary p-10 rounded-full">
              <BsCalendar3 className="text-6xl"></BsCalendar3>
            </div>
            <h4 className="font-bold text-white text-2xl text-center">
              Retire sua encomenda na data combinada
            </h4>
            <h5 className="font-bold text-white text-sm">{"✓"}</h5>
          </div>
        </div>
      </section>
    </div>
  );
}
