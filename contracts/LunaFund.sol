// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract LunaFund {
    uint public missionCount;

    struct Request {
        string description;
        uint amount;
        address payable recipient;
        uint approvalCount;
        bool completed;
        mapping(address => bool) approvals;
    }

    struct Mission {
        address creator;
        string title;
        string description;
        uint targetAmount;
        uint totalRaised;
        bool completed;
        mapping(address => uint) contributions;
        address[] contributors;
        Request[] requests;
    }

    mapping(uint => Mission) public missions;

    // Create a new Mission
    function createMission(
        string memory _title,
        string memory _description,
        uint _targetAmount
    ) public {
        Mission storage m = missions[missionCount++];
        m.creator = msg.sender;
        m.title = _title;
        m.description = _description;
        m.targetAmount = _targetAmount;
        m.completed = false;
    }

    // Contribute to a Mission
    function contribute(uint _missionId) public payable {
        require(msg.value > 0, "Must send ETH");
        Mission storage m = missions[_missionId];
        require(!m.completed, "Mission already completed");

        if (m.contributions[msg.sender] == 0) {
            m.contributors.push(msg.sender);
        }

        m.contributions[msg.sender] += msg.value;
        m.totalRaised += msg.value;

        // Auto-complete if goal is met
        if (m.totalRaised >= m.targetAmount) {
            m.completed = true;
        }
    }

    // Create a Withdrawal Request
    function createRequest(
        uint _missionId,
        string memory _description,
        uint _amount,
        address payable _recipient
    ) public {
        Mission storage m = missions[_missionId];
        require(
            msg.sender == m.creator,
            "Only mission creator can create request"
        );
        require(!m.completed, "Mission has ended");
        require(_amount <= m.totalRaised, "Amount exceeds funds");

        m.requests.push();
        uint requestId = m.requests.length - 1;
        Request storage r = m.requests[requestId];
        r.description = _description;
        r.amount = _amount;
        r.recipient = _recipient;
        r.completed = false;
        r.approvalCount = 0;
    }

    // Get all Requests for a Mission
    function getMissionRequests(
        uint _missionId
    )
        public
        view
        returns (
            uint[] memory amounts,
            address[] memory recipients,
            uint[] memory approvalCounts,
            bool[] memory completions,
            string[] memory descriptions
        )
    {
        Mission storage m = missions[_missionId];
        uint len = m.requests.length;

        recipients = new address[](len);
        approvalCounts = new uint[](len);
        completions = new bool[](len);
        descriptions = new string[](len);
        amounts = new uint[](len);

        for (uint i = 0; i < len; i++) {
            Request storage r = m.requests[i];
            recipients[i] = r.recipient;
            approvalCounts[i] = r.approvalCount;
            completions[i] = r.completed;
            descriptions[i] = r.description;
            amounts[i] = r.amount;
        }
    }

    // Approve a Request (by Contributor)
    function approveRequest(uint _missionId, uint _requestIndex) public {
        Mission storage m = missions[_missionId];
        Request storage r = m.requests[_requestIndex];

        require(m.contributions[msg.sender] > 0, "Only contributors can vote");
        require(!r.approvals[msg.sender], "Already voted");

        r.approvals[msg.sender] = true;
        r.approvalCount += m.contributions[msg.sender];
    }

    // Finalize the Request (if approved)
    function finalizeRequest(uint _missionId, uint _requestIndex) public {
        Mission storage m = missions[_missionId];
        Request storage r = m.requests[_requestIndex];

        require(!r.completed, "Request already completed");
        require(r.approvalCount > m.totalRaised / 2, "Not enough approvals");

        r.recipient.transfer(r.amount);
        r.completed = true;
    }

    // View Helpers
    function getContributors(
        uint _missionId
    ) public view returns (address[] memory) {
        return missions[_missionId].contributors;
    }

    function getContributions(
        uint _missionId
    ) public view returns (address[] memory, uint[] memory) {
        Mission storage m = missions[_missionId];
        uint len = m.contributors.length;

        address[] memory addresses = new address[](len);
        uint[] memory amounts = new uint[](len);

        for (uint i = 0; i < len; i++) {
            address contributor = m.contributors[i];
            addresses[i] = contributor;
            amounts[i] = m.contributions[contributor];
        }

        return (addresses, amounts);
    }

    function getRequestsCount(uint _missionId) public view returns (uint) {
        return missions[_missionId].requests.length;
    }

    function getMission(
        uint _missionId
    )
        public
        view
        returns (
            address creator,
            string memory title,
            string memory description,
            uint targetAmount,
            uint totalRaised,
            bool completed,
            uint pId
        )
    {
        Mission storage m = missions[_missionId];
        return (
            m.creator,
            m.title,
            m.description,
            m.targetAmount,
            m.totalRaised,
            m.completed,
            _missionId
        );
    }

    function getMissions()
        public
        view
        returns (
            address[] memory creators,
            string[] memory titles,
            string[] memory descriptions,
            uint[] memory targetAmounts,
            uint[] memory totalRaisedAmounts,
            bool[] memory completions
        )
    {
        creators = new address[](missionCount);
        titles = new string[](missionCount);
        descriptions = new string[](missionCount);
        targetAmounts = new uint[](missionCount);
        totalRaisedAmounts = new uint[](missionCount);
        completions = new bool[](missionCount);

        for (uint i = 0; i < missionCount; i++) {
            Mission storage m = missions[i];
            creators[i] = m.creator;
            titles[i] = m.title;
            descriptions[i] = m.description;
            targetAmounts[i] = m.targetAmount;
            totalRaisedAmounts[i] = m.totalRaised;
            completions[i] = m.completed;
        }
    }
}
