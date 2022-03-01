// SPDX-License-Identifier: MIT

import "./ownable.sol";
import "./IBEP20.sol";

pragma solidity 0.8.7;

contract HasForeignAsset is Ownable {
    function assetBalance(IBEP20 asset) external view returns (uint256) {
        return asset.balanceOf(address(this));
    }

    function getAsset(IBEP20 asset) external onlyOwner {
        asset.transfer(owner(), this.assetBalance(asset));
    }
}
