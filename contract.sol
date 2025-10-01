// contracts/CredentialVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVault {
    struct Credential {
        address issuer;
        string ipfsHash;
        uint256 timestamp;
    }

    mapping(address => Credential[]) public credentials;

    event CredentialIssued(address indexed student, string ipfsHash);

    function issueCredential(address student, string memory ipfsHash) public {
        Credential memory newCredential = Credential({
            issuer: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        });

        credentials[student].push(newCredential);
        emit CredentialIssued(student, ipfsHash);
    }

    function getCredentials(address student) public view returns (Credential[] memory) {
        return credentials[student];
    }
}