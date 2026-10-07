import { useEffect, useState } from "react";

export function Requests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await fetch(
                    "https://skillswap-backend-kkdd.onrender.com/swap-requests/received",
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                const data = await response.json();

                console.log("Received requests:", data);

                if (response.ok) {
                    const sortedRequests = [...data].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                    setRequests(sortedRequests);
                }
            } catch (error) {
                console.log("Failed to fetch requests:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRequests();
    }, []);


    async function handleAccept(requestId) {
        const response = await fetch(
            `https://skillswap-backend-kkdd.onrender.com/swap-requests/${requestId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    status: "accepted"
                })
            }
        );

        const data = await response.json();

        console.log("Accept response:", data);

        if (response.ok) {
            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request._id === requestId
                        ? { ...request, status: "accepted" }
                        : request
                )
            );
        }
    }



    async function handleReject(requestId) {
        const response = await fetch(
            `https://skillswap-backend-kkdd.onrender.com/swap-requests/${requestId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    status: "rejected"
                })
            }
        );

        const data = await response.json();

        console.log("Reject response:", data);

        if (response.ok) {
            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request._id === requestId
                        ? { ...request, status: "rejected" }
                        : request
                )
            );
        }
    }

    if (loading) {
        return <p>Loading requests...</p>;
    }


    return (
        <div className="requests-page">

            <div className="requests-header">
                <h1>My Requests</h1>
                <p>Manage requests from people who want to learn from you.</p>
            </div>

            {requests.length === 0 ? (
                <div className="requests-empty">
                    <h3>No requests yet</h3>
                    <p>When someone sends you a skill swap request, it will appear here.</p>
                </div>
            ) : (
                <div className="requests-list">
                    {requests.map((request) => (
                        <div className="request-card" key={request._id}>

                            <div className="request-info">
                                <p className="request-label">SKILL SWAP REQUEST</p>

                                <h3>
                                    {request.requester?.name} wants to learn {request.skill}
                                </h3>

                                <p className={`request-status ${request.status}`}>
                                    Status: {request.status}
                                </p>
                            </div>

                            {request.status === "pending" && (
                                <div className="request-actions">
                                    <button
                                        className="accept-button"
                                        onClick={() => handleAccept(request._id)}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="reject-button"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}