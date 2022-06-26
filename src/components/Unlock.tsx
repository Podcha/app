import { useEffect, useState } from "react";

const UnlockExample = ({ Content }: any) => {
  const [locked, setLocked] = useState("locked");

  const checkout = () => {
    /* @ts-ignore */
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };

  useEffect(() => {
    const checkUnlock = async () => {
      try {
        /* @ts-ignore */
        await window.unlockProtocol;
        /* @ts-ignore */
        if (window.unlockProtocol) {
          /* @ts-ignore */
          setLocked(window.unlockProtocol.getState());
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkUnlock();
  }, []);

  return (
    <div>
      {locked === "locked" ? (
        <button onClick={checkout}>Unlock Content</button>
      ) : (
        <div>{Content}</div>
      )}
    </div>
  );
};

export default UnlockExample;
