 
import contract from "@truffle/contract";

export const loadContract = async (name, provider, fromAccount) => {
  try {
    // Load the contract artifact from a JSON file  
    const contractArtifact = require(`../../public/contracts/${name}.json`);

    // Create a contract instance from the artifact.
    const Contract = contract(contractArtifact);

    // Set the Web3 provider.
    Contract.setProvider(provider);

    // Deployed contract instance using the specified fromAccount.
    const deployedContract = await Contract.deployed({ from: fromAccount });

    return deployedContract;
  } catch (error) {
    console.error("Error loading contract:", error);
    throw error;
  }
};