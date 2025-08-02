import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'react-hot-toast';
import { SendHorizonal } from 'lucide-react';

const Messageform = () => {
    const [message, setMessage] = useState<string>('');
    const [delay, setDelay] = useState<number>(10);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const handleSend = () => {
        setIsSending(true);
        const id = setTimeout(() => {
            toast.success("📨 Message Sent!");
            setMessage('');
            setIsSending(false);
        }, delay * 1000);
        setTimerId(id);
    };

    const handleCancel = () => {
        if (timerId) clearTimeout(timerId);
        setIsSending(false);
        toast.error("❌ Sending Cancelled");
    };

    return (
        <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-yellow-50 space-y-4'>
            <h2 className='text-2xl font-bold text-gray-800'>Dm Delay Button</h2>

            <Textarea
                placeholder='Type your message.....'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
            />

            <Input
                type='number'
                placeholder='Delay in seconds'
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                disabled={isSending}
            />

            {/* 🔘 Quick delay buttons */}
            <div className='flex gap-2'>
                {[10, 30, 60].map((d) => (
                    <Button
                        key={d}
                        variant={delay === d ? 'default' : 'outline'}
                        onClick={() => setDelay(d)}
                        disabled={isSending}
                    >
                        {d}s
                    </Button>
                ))}
            </div>

            {/* 👀 Message preview */}
            {message && !isSending && (
                <div className='border p-3 rounded bg-gray-50 text-sm text-gray-800'>
                    <p className='font-semibold mb-1'>Preview:</p>
                    <p>{message}</p>
                </div>
            )}

            {/* ✅ Send / Cancel Buttons */}
            {!isSending ? (
                <Button
                    className='w-full flex items-center justify-center gap-2'
                    onClick={handleSend}
                    disabled={!message}
                >
                    <SendHorizonal className='w-4 h-4' />
                    Send with delay
                </Button>
            ) : (
                <Button className='w-full' variant='destructive' onClick={handleCancel}>
                    Cancel Sending
                </Button>
            )}
        </div>
    );
};

export default Messageform;
