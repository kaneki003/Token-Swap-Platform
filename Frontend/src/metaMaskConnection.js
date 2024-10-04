import { ethers } from "ethers";

// Function to detect MetaMask and connect
const connectMetaMask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      // If there are already connected accounts, use the first one
      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // Await the getSigner() call
        return signer;
      } else {
        // Request account access if no accounts are connected
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        return signer;
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect MetaMask");
    }
  } else {
    setError("MetaMask is not installed");
  }
};

export default connectMetaMask;
