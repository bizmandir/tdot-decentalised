const ethers = require("ethers");

const CustomDex = artifacts.require("CustomDex.sol");

contract("CustomDex", () => {
  it("Get Total supply for AskTrabaajo", async () => {
    const dex = await CustomDex.new();
    const total = await dex.getTotalSupply("AskTrabaajo");
    assert(total.toString() === "1000000000000000000000");
  });
});

contract("CustomDex", () => {
  it("Swap eth for token", async () => {
    const dex = await CustomDex.new();

    // Swap eth to token (AskTrabaajo)
    const output = await dex.swapEthToToken("AskTrabaajo", {
      value: ethers.utils.parseEther("0.001"),
    });

    // Sender
    const { from } = output.receipt;

    // Validate the eth balance of dex
    const ethBalance = await dex.getEthBalance();
    assert(ethBalance.toString() === "1000000000000000");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfDex = await dex.getBalance("AskTrabaajo", dex.address);
    assert(tokenBalanceOfDex.toString() === "999999999999999999990");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfWallet = await dex.getBalance("AskTrabaajo", from);
    assert(tokenBalanceOfWallet.toString() === "10");
  });
});

contract("CustomDex", () => {
  it("Swap token for token", async () => {
    const dex = await CustomDex.new();

    // Get AskTrabaajo
    const output = await dex.swapEthToToken("AskTrabaajo", {
      value: ethers.utils.parseEther("0.001"),
    });

    // Sender
    const { from } = output.receipt;

    const tokenAddress = await dex.getTokenAddress("AskTrabaajo");

    // ------------- Increasing allowance of AskTrabaajo --------------
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );

    const abi = require("./CustomToken.json");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, signer);

    await contract.approve(dex.address, 100);
    // ------------- Increasing allowance of AskTrabaajo --------------

    // Swap AskTrabaajo for tdot
    await dex.swapTokenToToken("AskTrabaajo", "tdot", "10");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfDex = await dex.getBalance("AskTrabaajo", dex.address);
    assert(tokenBalanceOfDex.toString() === "1000000000000000000000");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfWallet = await dex.getBalance("AskTrabaajo", from);
    assert(tokenBalanceOfWallet.toString() === "0");
  });
});

contract("CustomDex", () => {
  it("Swap token for eth", async () => {
    const dex = await CustomDex.new();

    // Get AskTrabaajo
    const output = await dex.swapEthToToken("AskTrabaajo", {
      value: ethers.utils.parseEther("0.001"),
    });

    // Sender
    const { from } = output.receipt;

    const tokenAddress = await dex.getTokenAddress("AskTrabaajo");

    // ------------- Increasing allowance of AskTrabaajo --------------
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );

    const abi = require("./CustomToken.json");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, abi, signer);

    await contract.approve(dex.address, 100);
    // ------------- Increasing allowance of AskTrabaajo --------------

    await dex.swapTokenToEth("AskTrabaajo", "10");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfDex = await dex.getBalance("AskTrabaajo", dex.address);
    assert(tokenBalanceOfDex.toString() === "1000000000000000000000");

    // Vaidate token balance of AskTrabaajo
    const tokenBalanceOfWallet = await dex.getBalance("AskTrabaajo", from);
    assert(tokenBalanceOfWallet.toString() === "0");
  });
});
