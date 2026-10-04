import { useEffect, useState } from "react";

export function Requests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRequests() {
            try {
                const response = await fetch(
                    "http://localhost:3000/swap-requests/received",
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                const data = await response.json();

                console.log("Received requests:", data);

                if (response.ok) {
                    setRequests(data);
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
            `http://localhost:3000/swap-requests/${requestId}`,
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
            `http://localhost:3000/swap-requests/${requestId}`,
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
        <div>
            <h1>My Requests</h1>

            {requests.length === 0 ? (
                <p>No requests yet.</p>
            ) : (
                requests.map((request) => (
                    <div key={request._id}>
                        <h3>
                            {request.requester?.name} wants to learn {request.skill}
                        </h3>

                        <p>Status: {request.status}</p>

                        {request.status === "pending" && (
                            <>
                                <button onClick={() => handleAccept(request._id)}>
                                    Accept
                                </button>

                                <button onClick={() => handleReject(request._id)}>
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}