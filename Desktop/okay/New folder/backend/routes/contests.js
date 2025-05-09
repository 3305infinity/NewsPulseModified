const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/contests", async (req, res) => {
    try {
        const codeforcesAPI = "https://codeforces.com/api/contest.list";
        const leetcodeAPI = "http://127.0.0.1:5001/contests/leetcode";
        const atcoderAPI = "http://127.0.0.1:5003/contests/atcoder";  // Flask API
        // Fetch data from APIs in parallel
        const [cfResponse, leetcodeResponse, atcoderResponse] = await Promise.all([
            axios.get(codeforcesAPI),
            axios.get(leetcodeAPI),
            axios.get(atcoderAPI)
        ]);
        // Process Codeforces contests
        const codeforcesContests = cfResponse.data.result
            .filter(contest => contest.phase === "BEFORE") 
            .map(contest => ({
                id: `cf-${contest.id}`,
                platform: "Codeforces",
                name: contest.name,
                url: `https://codeforces.com/contest/${contest.id}`,
                startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
                duration: (contest.durationSeconds / 3600).toFixed(1) + " hrs"
            })).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));;

        // Process LeetCode contests
        const leetcodeContests = leetcodeResponse.data.map((contest, index) => ({
            id: `${contest.platform.toLowerCase()}-${index}`,
            platform: contest.platform,
            name: contest.name,
            url: contest.url,
            startTime: contest.start_time || contest.startTime,
            duration: contest.duration
        })).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));;

        // Process AtCoder contests from Flask API
        const atcoderContests = atcoderResponse.data.map((contest, index) => ({
            id: `atcoder-${index}`,
            platform: "AtCoder",
            name: contest.name,
            url: contest.url,
            startTime: contest.start_time,
            duration: contest.duration
        })).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));;

        // Extract the next upcoming contest for each platform
        const upcomingContests = {
            Codeforces: codeforcesContests.length > 0 ? codeforcesContests[0] : null,
            LeetCode: leetcodeContests.length > 0 ? leetcodeContests[0] : null,
            AtCoder: atcoderContests.length > 0 ? atcoderContests[0] : null
        };

        // Combine all contests
        const allContests = [...codeforcesContests, ...leetcodeContests, ...atcoderContests]
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        res.json({ 
            allContests,    
            upcoming: upcomingContests 
        });

    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ 
            error: "Failed to fetch contests",
            details: error.message 
        });
    }
});

module.exports = router;
