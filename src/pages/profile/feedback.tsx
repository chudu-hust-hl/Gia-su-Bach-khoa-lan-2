import { useState } from "react";
import Button from "@/components/button";
import { useSuccessFeedback } from "@/hooks";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [feedback, setFeedback] = useState('');
	const successFeedback = useSuccessFeedback();

    const handleSend = () => {
        // Handle sending feedback (e.g., send to an API or log it)
        console.log(feedback);
        successFeedback();
        onClose(); // Close the modal after sending feedback
    };

    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-4 rounded-lg shadow-md w-3/5">
                <h2 className="text-lg mb-2">Đóng góp ý kiến</h2>
                <textarea
                    className="w-full h-24 border p-2"
                    placeholder="Nhập ý kiến của bạn..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex justify-end space-x-2 mt-4">
                    <Button onClick={onClose} className="bg-gray-300">
                        Đóng
                    </Button>
                    <Button onClick={handleSend} className="bg-blue text-white">
                        Gửi
                    </Button>
                </div>
            </div>
        </div>
    );
}