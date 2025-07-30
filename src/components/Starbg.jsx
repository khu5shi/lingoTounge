// components/StarBackground.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

const Starbg = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          color: {
            value: "#0f172a", // Dark blueish background
          },
          particles: {
      move: {
        enable: true,
        speed:50,
        direction: "none", // use "top", "bottom", "left", etc. or "none" for random
  straight: false, // 🔥 increase this to make stars move faster (default ~1)
      },
    },
        },
        fullScreen: { enable: true, zIndex: -1 },
      }}
    />
  );
};

export default Starbg;
