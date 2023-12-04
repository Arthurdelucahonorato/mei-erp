import { Button } from "@/components/Button";
import Bolo1 from "@/assets/boloChocolateMorango.jpeg";
import Doce from "@/assets/docinhosDeFesta.webp";
import Salgados from "@/assets/salgadinhos.webp";
import Image from "next/image";
import { BsMap, BsBasket, BsCalendar3 } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const titleVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
      },
    },
  };

  const squareVariants = {
    visible: { opacity: 1, transition: { duration: 1 } },
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

  const textToSendWhatsApp = () => {
    const numeroTelefone = "48999582066"; // Substitua pelo seu número de telefone do WhatsApp
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de fazer um pedido`
    );
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

    window.open(linkWhatsApp, "_blank");
  };

  return (
    <div className="flex flex-col bg-red-50">
      <section className="flex flex-col h-screen">
        <div className="relative w-full left-0 overflow-hidden top-0 h-screen bg-[url('../assets/homeBackground.jpg')] bg-no-repeat bg-center bg-cover">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                Venha adoçar a sua vida!!!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1, type: "keyframes" }}
                className="font-semibold text-lg text-center"
              >
                Prove os melhores bolos, doces e salgados! Se delicie com nossos
                produtos de alta qualidade! Aqui você encontra nossas mercadorias
                de dar água na boca, tudo por um preço acessível e feito com muito amor.
              </motion.p>
              <div className="flex w-full max-w-xl mx-auto justify-center flex-col md:flex-row gap-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <Button type="button" onClick={() => "/cardapio"} >
                    <Link className="flex" href="/cardapio">
                      Cardápio
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <Button type={"button"} onClick={() => textToSendWhatsApp()} variant="ghost">Faça um pedido</Button>
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
            <h3 className="text-2xl font-bold text-primary">Missão</h3>
            <p className="text-base font-sans text-black text-center">
              Servir aos nossos clientes doces, tortas e salgados da melhor
              qualidade possível pelo melhor preço.
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
              src={Doce}
              alt="docinhos"
              className="rounded-full aspect-square object-cover max-w-[15rem] "
            />
            <h3 className="text-2xl font-bold text-primary">Visão</h3>
            <p className="text-base font-sans text-black text-center">
              Ser a melhor fornecedora de pratos de festa de todo o Brasil.
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
              src={Salgados}
              alt="salgadinhos"
              className="rounded-full aspect-square object-cover max-w-[15rem] "
            />
            <h3 className="text-2xl font-bold text-primary">Valores</h3>
            <p className="text-base font-sans text-black text-center">
              Nossos valores são: Honestidade, diligência, criatividade e
              proatividade.
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
