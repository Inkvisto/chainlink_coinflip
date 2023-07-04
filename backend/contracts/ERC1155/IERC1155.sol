// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;
interface IERC1155 {
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint id,
        uint value
    );

    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint[] ids,
        uint[] values
    );

    event ApprovalForAll(
        address indexed account,
        address indexed operator,
        bool approved
    );

    event URI(string value, uint indexed id);

    function balanceOf(address count, uint id) external view returns (uint);

    function balanceofBatch(
        address[] calldata accounts,
        uint[] calldata ids
    ) external view returns (uint[] memory);

    function setApprovalForAll(address operator, bool approved) external;

    function isApprovedForAll(
        address account,
        address operator
    ) external view returns (bool);

    function safeTransferFrom(
        address from,
        address to,
        uint id,
        uint amount,
        bytes calldata data
    ) external;

    function safeBatchTransferFrom(
        address from,
        address to,
        uint[] calldata ids,
        uint[] calldata amounts,
        bytes calldata data
    ) external;
}
