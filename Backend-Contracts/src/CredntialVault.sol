// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

// This contract handles credential issuance, revocation, and public verification.
contract CredentialVault is AccessControl {

    // --- 1. Role Definitions ---
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    // --- 2. Data Structure ---
    struct Credential {
        address issuer;
        uint48 issueTimestamp;
        bool isRevoked;
    }
    mapping(address => mapping(bytes32 => Credential)) public issuedCredentials;

    // --- 3. Events ---
    event CredentialIssued(
        address indexed holder,
        address indexed issuer,
        bytes32 indexed documentHash,
        uint256 timestamp
    );

    event CredentialRevoked(
        address indexed holder,
        address indexed issuer,
        bytes32 indexed documentHash,
        uint256 timestamp
    );

    // --- 4. Constructor (Initializes the roles) ---
    constructor(address _initialAdmin, address[] memory _initialIssuers) {
        // Set the deployer/specified address as the main admin
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        _setRoleAdmin(ISSUER_ROLE, DEFAULT_ADMIN_ROLE);

        // Grant the initial list of trusted institutions the ISSUER_ROLE
        for (uint i = 0; i < _initialIssuers.length; i++) {
            _grantRole(ISSUER_ROLE, _initialIssuers[i]);
        }
    }

    // --- 5. Core Logic Functions ---

    function issueCredential(address _holder, bytes32 _documentHash) public onlyRole(ISSUER_ROLE) {
        require(_documentHash != bytes32(0), "Hash cannot be empty");
        require(issuedCredentials[_holder][_documentHash].issuer == address(0), "Credential already issued");

        issuedCredentials[_holder][_documentHash] = Credential({
            issuer: msg.sender,
            issueTimestamp: uint48(block.timestamp),
            isRevoked: false
        });

        emit CredentialIssued(_holder, msg.sender, _documentHash, block.timestamp);
    }

    function revokeCredential(address _holder, bytes32 _documentHash) public onlyRole(ISSUER_ROLE) {
        Credential storage credential = issuedCredentials[_holder][_documentHash];

        require(credential.issuer != address(0), "Credential not found");
        // Good practice to also check: require(credential.issuer == msg.sender, "Only original issuer can revoke");
        require(!credential.isRevoked, "Credential already revoked");

        credential.isRevoked = true;

        emit CredentialRevoked(_holder, msg.sender, _documentHash, block.timestamp);
    }

    // --- 6. Public Verification Function ---

    function verifyCredential(address _holder, bytes32 _documentHash)
        public
        view
        returns (bool isValid, address issuer, uint256 timestamp)
    {
        Credential memory credential = issuedCredentials[_holder][_documentHash];

        // Must be issued AND must NOT be revoked
        bool issued = credential.issuer != address(0);
        bool valid = issued && !credential.isRevoked;

        // Return 0/address(0) if not issued, otherwise return the actual details.
        if (!issued) {
            return (false, address(0), 0);
        }

        return (valid, credential.issuer, credential.issueTimestamp);
    }

    // --- 7. Access Control View Function (Useful for the frontend) ---
    function isIssuer(address _addr) public view returns (bool) {
        return hasRole(ISSUER_ROLE, _addr);
    }
}