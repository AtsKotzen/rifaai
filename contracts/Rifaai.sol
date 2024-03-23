// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Rifaai is ReentrancyGuard {
    using SafeMath for uint256;

    address payable public manager;
    address payable[] public players;
    address payable[] public lastWinners;
    bool public winnerPicked;
    address payable public foundationAddress;

    event WinnerPicked(address winner);
    event Entered(address player);

    constructor(address payable _foundationAddress) {
        manager = payable(msg.sender);
        foundationAddress = _foundationAddress;
    }

    function enter() public payable {
        require(msg.value > 0, "minimum amount");
        players.push(payable(msg.sender));
        emit Entered(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public payable restricted nonReentrant {
        require(players.length > 0, "No players");
        require(!winnerPicked, "A winner has been picked.");

         // Calcula a quantidade total a ser distribuída
        uint totalAmount = address(this).balance;
        uint managerAmount = totalAmount * 88 / 100; // 90% do saldo
        uint foundationAmount = totalAmount * 10 / 100; // 8% do saldo
        uint gasCost = gasleft() * tx.gasprice;

        require(totalAmount >= managerAmount.add(foundationAmount).add(gasCost), "Insufficient contract balance.");

        (bool success, ) = manager.call{value: managerAmount}("");
        require(success, "Manager transfer failed.");

        (success, ) = foundationAddress.call{value: foundationAmount}("");
        require(success, "Foundation transfer failed.");

        (success, ) = manager.call{value: gasCost}("");
        require(success, "Gas cost transfer failed.");

        uint winnerIndex = random() % players.length;
        address payable winner = players[winnerIndex];
        lastWinners.push(winner);
        emit WinnerPicked(winner);

        delete players;
        winnerPicked = true;
    }

    function withdraw() public restricted nonReentrant {
        require(winnerPicked, "No winner has been picked yet.");
        uint balance = address(this).balance;
        require(balance > 0, "No funds to withdraw.");
        (bool success, ) = manager.call{value: balance}("");
        require(success, "Withdrawal failed.");
        winnerPicked = false;
    }

    modifier restricted() {
        require(msg.sender == manager, "Manager only");
        _;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getLastWinners() public view returns (address payable[] memory) {
        return lastWinners;
    }
}