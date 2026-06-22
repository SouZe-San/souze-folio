<template>
  <footer className="contactSection relative">
    <div
      class="borderBox flex flex-col gap-2 sm:gap-5 justify-center items-center relative "
      ref="borderBody"
    >
      <h1 class="lg:text-7xl md:text-5xl text-5xl anime-text">
        <span class="font-cinzel-bold">G</span>et<span class="font-changa">
          In</span
        ><span class="font-cinzel-bold"> T</span>ouch
      </h1>
      <p class="md:text-lg anime-text">
        Unlocking potential through collaboration and shared expertise. Feel
        free to reach out
        <span class="code-tag flash isolate font-roboto-condensed">~o_ o~</span>
      </p>
      <button
        class="btn flex items-center gap-3 anime-text"
        @mouseenter="cursorHide"
        @mouseleave="cursorRevel"
      >
        <code>
          <a href="mailto:soumyajit.codemail@gmail.com"
            >soumyajit.codemail@gmail.com</a
          >
        </code>
        <Transition name="icon" mode="out-in">
          <svg
            v-if="!copied"
            @click="copyEmail"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-copy-icon lucide-copy"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          <!-- check icon -->
          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2703_21)">
              <path
                d="M128 24C107.431 24 87.3235 30.0995 70.2207 41.5272C53.118 52.9548 39.7881 69.1974 31.9166 88.2009C24.0451 107.204 21.9855 128.115 25.9984 148.289C30.0112 168.463 39.9163 186.994 54.4609 201.539C69.0056 216.084 87.5366 225.989 107.711 230.002C127.885 234.015 148.796 231.955 167.799 224.083C186.803 216.212 203.045 202.882 214.473 185.779C225.901 168.677 232 148.569 232 128C231.971 100.426 221.004 73.9905 201.507 54.4931C182.01 34.9956 155.574 24.0291 128 24ZM173.66 109.66L117.66 165.66C116.917 166.404 116.035 166.994 115.064 167.396C114.092 167.799 113.051 168.006 112 168.006C110.949 168.006 109.908 167.799 108.937 167.396C107.965 166.994 107.083 166.404 106.34 165.66L82.34 141.66C80.8389 140.159 79.9956 138.123 79.9956 136C79.9956 133.877 80.8389 131.841 82.34 130.34C83.8412 128.839 85.8771 127.996 88 127.996C90.123 127.996 92.1589 128.839 93.66 130.34L112 148.69L162.34 98.34C163.083 97.5967 163.966 97.0071 164.937 96.6049C165.908 96.2026 166.949 95.9956 168 95.9956C169.051 95.9956 170.092 96.2026 171.063 96.6049C172.034 97.0071 172.917 97.5967 173.66 98.34C174.403 99.0833 174.993 99.9657 175.395 100.937C175.797 101.908 176.005 102.949 176.005 104C176.005 105.051 175.797 106.092 175.395 107.063C174.993 108.034 174.403 108.917 173.66 109.66Z"
                fill="#C9FFCB"
              />
            </g>
            <defs>
              <clipPath id="clip0_2703_21">
                <rect width="256" height="256" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Transition>
      </button>
      <span v-if="copied" class="copy-toast">Copied successfully</span>

      <!-- Gif s -->

      <!-- universal - bottom gif -->
      <img
        src="/assets/gif/lossy.gif"
        alt=""
        aria-hidden="true"
        draggable="false"
        class="corner-buddy bottom-0"
        style="--buddy-left: 1rem; --buddy-right: unset"
        v-if="isFine"
      />

      <!-- inside box - Right gif -->
      <img
        src="/assets/gif/side01.gif"
        alt=""
        aria-hidden="true"
        draggable="false"
        class="corner-buddy inside-corner-buddy bottom-2.5"
        style="--buddy-left: unset; --buddy-right: -13px"
        v-if="isFine && boxReady"  
      />
            <!-- inside box - Top gif -->
       <img
        src="/assets/gif/topPeak.gif"
        alt=""
        aria-hidden="true"
        draggable="false"
        class="corner-buddy inside-corner-buddy -top-1.5 rotate-180"
        style="--buddy-left: 0; --buddy-right: unset"
        v-if="boxReady"
      />
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const { setHover } = useHover();
const { $gsap } = useNuxtApp();

function cursorHide() {
  setHover(true, "none");
}

function cursorRevel() {
  setHover(false);
}
const isFine = ref(false);
let mq: MediaQueryList | null = null;
const onPointerKind = (e: MediaQueryListEvent | MediaQueryList) => {
  isFine.value = e.matches;
};
const email = "soumyajit.codemail@gmail.com";
const copied = ref(false);

const boxReady = ref(false);

async function copyEmail() {
  let ok = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      console.warn("Clipboard API failed, trying fallback");
    }
  }
  if (!ok) {
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ok = document.execCommand("copy");
    document.body.removeChild(ta);
  }
  if (ok) {
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }
}

onMounted(() => {
  const media = $gsap.matchMedia();

  mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  isFine.value = mq.matches;
  mq.addEventListener("change", onPointerKind);

  media.add(
    {
      isDesktop: `(min-width: ${640 + 1}px)`,
      isMobile: `(max-width: ${640}px)`,
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions as {
        isDesktop: boolean;
        isMobile: boolean;
      };
      $gsap.fromTo(
        ".borderBox",
        {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          borderColor: "#cfcfcf00",
        },
        {
          width: isMobile ? "85%" : "70%",
          height: isDesktop ? "75%" : "60%",
          borderRadius: 15,
          borderColor: "#cccccc47",
          scrollTrigger: {
            trigger: ".contactSection",
            start: "top center-=10",
            end: "center center+=80",
            scrub: true,
            toggleActions: "play none reverse reverse",
          },
          onComplete: () => {
              boxReady.value = true;
            $gsap.fromTo(
              ".anime-text",
              {
                y: 100,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: "power2.inOut",
              },
            );
          },
          onReverseComplete: () => {
               boxReady.value = false;
            $gsap.to(".anime-text", {
              y: 100,
              autoAlpha: 0,
            });
          },
        },
      );
    },
  );
});

onUnmounted(() => {
  mq?.removeEventListener("change", onPointerKind);
});
</script>

<style scoped>
footer {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.borderBox {
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
  overflow: visible clip;
}
button {
  border: 1px solid #cfcfcf87;
  margin-top: 1rem;
  font-size: 20px;
  border-radius: 12px;
  padding: 5px 24px;

  background:
    url("/noiseTex.webp") repeat,
    #eeeeee13;
  background-size: 100px;
}
.anime-text {
  opacity: 0;
}
p {
  color: rgba(219, 219, 219, 0.602);
}

.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s ease;
}
.icon-enter-from,
.icon-leave-to {
  opacity: 0;
}

.copy-wrap {
  position: relative;
  display: inline-flex;
}

.copy-toast {
  position: absolute;
  top: calc(100% - 8rem);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 6px 24px;
  border-radius: 8px;
  font-size: 0.8rem;

  background: rgba(29, 99, 34, 0.37);
  color: #04ff5a;
  border: 1px solid rgba(42, 158, 110, 0.3);

  pointer-events: none;
  font-weight: 500;
  letter-spacing: 1px;
  animation: toast-life 1.5s ease forwards;
}

@keyframes toast-life {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
  12% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  70% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  } 
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  } 
}

.corner-buddy {
  position: fixed;
  left: var(--buddy-left);
  right: var(--buddy-right);
 
  width: 200px;
  height: auto;
  z-index: 10; 
  pointer-events: none; 
  user-select: none;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.45)) opacity(0.34);
}

.inside-corner-buddy{
  position: absolute;
}

@media (width <= 640px) {
  footer {
    height: 90svh;
  }
  button {
    font-size: 12px;
    border-radius: 8px;
    padding: 5px 15px;
    svg {
      width: 14px;
    }
  }
  p {
    padding: 1rem;
    text-align: center;
    line-height: 1.3;
    word-spacing: 5px;
  }
}
</style>
