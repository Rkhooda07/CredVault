// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {CredentialVault} from "../src/CredntialVault.sol";
import {console} from "forge-std/console.sol"; // For logging the address

// The contract responsible for deploying the CredentialVault.
contract DeployVault is Script {

    // --- Configuration Variables ---
    
    // !!! IMPORTANT: REPLACE THIS ADDRESS with YOUR ACTUAL DEPLOYER/ADMIN WALLET ADDRESS !!!
    // This address will fund the deployment and receive the DEFAULT_ADMIN_ROLE.
    address public constant ADMIN_ADDRESS = 0xAf686bBa4935f71d4CDd1198b4E55e746bA51CAd; 
    
    // Array to hold the list of initial addresses that will be granted the ISSUER_ROLE
    address[] public initialIssuers;

    // --- Setup (Executed before deployment logic) ---
    function setUp() public {
        // Initialize the list of trusted initial issuers. 
        // These should be real, valid addresses for the institutions you want to start with.
        
        // Example Initial Issuers (Replace these with real addresses for deployment)
        initialIssuers.push(0xd65C2cB5fdeACC4d2CCd53553E9CeB6501e24b96); // College A's address
        // initialIssuers.push(0xAcC4d3myB04rd77777777777777777777); // Board/Accrediting Body B's address
        
        // Ensure all placeholder addresses are 42 characters and use only 0-9, a-f.
    }

    // --- Deployment Logic ---
    function run() public returns (CredentialVault) {
        
        // Start broadcasting transactions using the private key specified in the CLI
        vm.startBroadcast();

        // Deploy the contract: passes the admin and the list of initial issuers to the constructor
        CredentialVault vault = new CredentialVault(
            ADMIN_ADDRESS,
            initialIssuers
        );

        // Stop broadcasting
        vm.stopBroadcast();

        // Log the deployed address for immediate verification on Etherscan/Polygonscan
        console.log("CredentialVault deployed at:", address(vault));

        return vault;
    }
}