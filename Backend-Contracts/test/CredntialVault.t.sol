// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {CredentialVault} from "../src/CredntialVault.sol";

contract CredentialVaultTest is Test {
    CredentialVault public vault;

    // Helper addresses using deterministic values
    address public ALICE = vm.addr(0x1);       // The student (Holder)
    address public ADMIN = vm.addr(0x2);       // The contract admin
    address public COLLEGE_A = vm.addr(0x3);   // A verified issuer
    address public RANDOM_USER = vm.addr(0x4); // An unverified user

    // Sample Data
    bytes32 public constant HASH_CS_DEGREE = keccak256(abi.encodePacked("CS_DEGREE_2025_ALICE"));
    address[] public initialIssuers = new address[](1);

    function setUp() public {
        initialIssuers[0] = COLLEGE_A;

        // Deploy the contract, ensuring the ADMIN is the caller initially
        vm.prank(ADMIN);
        vault = new CredentialVault(ADMIN, initialIssuers);
    }

    // --- Core Functionality Tests ---

    function testIssueAndVerifySuccess() public {
        // ACT: Issue credential by a verified institution (COLLEGE_A)
        vm.prank(COLLEGE_A);
        vault.issueCredential(ALICE, HASH_CS_DEGREE);

        // ASSERT: Check the verification status
        (bool isValid, address issuer, uint256 timestamp) = vault.verifyCredential(ALICE, HASH_CS_DEGREE);

        assertTrue(isValid, "Credential should be valid and verified.");
        assertEq(issuer, COLLEGE_A, "The issuer address is incorrect.");
        assertGt(timestamp, 0, "Timestamp must be recorded.");
    }

    function testRevocationByIssuer() public {
        // 1. Issue the credential (Setup)
        vm.prank(COLLEGE_A);
        vault.issueCredential(ALICE, HASH_CS_DEGREE);

        // 2. Revoke the credential
        vm.prank(COLLEGE_A);
        vault.revokeCredential(ALICE, HASH_CS_DEGREE);

        // 3. Verify it is now invalid
        (bool isValidFinal, , ) = vault.verifyCredential(ALICE, HASH_CS_DEGREE);
        assertFalse(isValidFinal, "Credential must be invalid after revocation.");
    }

    // --- Security & Access Control Tests (The critical fixes are here) ---

    function testRevertsWhenRandomUserTriesToIssue() public {
        // ARRANGE: Get the role identifier
        bytes32 issuerRole = vault.ISSUER_ROLE();

        // EXPECT REVERT: Use the specific custom error format from OpenZeppelin
        // AccessControlUnauthorizedAccount(address account, bytes32 role)
        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)")),
            RANDOM_USER, // The unauthorized address (account)
            issuerRole   // The role that was required
        ));

        // ACT: Unauthorized user attempts to issue
        vm.prank(RANDOM_USER);
        vault.issueCredential(ALICE, HASH_CS_DEGREE);
    }
    
    function testRevertsIfCredentialIsDoubleIssued() public {
        // 1. Issue successfully (Ensure the verified issuer is the sender)
        vm.prank(COLLEGE_A);
        vault.issueCredential(ALICE, HASH_CS_DEGREE);

        // 2. Attempt to issue the exact same credential again (STILL use the verified issuer)
        // This ensures the transaction gets past AccessControl and hits your custom 'require'
        vm.prank(COLLEGE_A); 
        vm.expectRevert("Credential already issued");
        vault.issueCredential(ALICE, HASH_CS_DEGREE);
    }

    function testRevertsWhenRevokingUnissuedCredential() public {
        bytes32 UNISSUED_HASH = keccak256(abi.encodePacked("UNISSUED_HASH"));
        
        // This must be called by an issuer to test the custom require logic
        vm.prank(COLLEGE_A); 
        vm.expectRevert("Credential not found");
        vault.revokeCredential(ALICE, UNISSUED_HASH);
    }
}