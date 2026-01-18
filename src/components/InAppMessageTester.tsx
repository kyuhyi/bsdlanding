'use client';

import { useEffect, useState } from 'react';

export default function InAppMessageTester() {
    const [isOneSignalReady, setIsOneSignalReady] = useState(false);
    const [messageHistory, setMessageHistory] = useState<string[]>([]);

    useEffect(() => {
        // OneSignal이 준비될 때까지 대기
        const checkOneSignal = setInterval(() => {
            if (typeof (window as any).OneSignal !== 'undefined') {
                setIsOneSignalReady(true);
                clearInterval(checkOneSignal);
                
                // 인앱 메시지 이벤트 리스너 추가
                (window as any).OneSignal.Slidedown.addEventListener('slidedownShown', (event: any) => {
                    const timestamp = new Date().toLocaleTimeString('ko-KR');
                    setMessageHistory(prev => [...prev, `[${timestamp}] 인앱 메시지 표시됨`]);
                });
            }
        }, 100);

        return () => clearInterval(checkOneSignal);
    }, []);

    const triggerTestMessage = async () => {
        if (!isOneSignalReady) {
            alert('OneSignal이 아직 준비되지 않았습니다.');
            return;
        }

        try {
            // OneSignal 인앱 메시지 트리거
            const OneSignal = (window as any).OneSignal;
            
            // 태그 설정으로 인앱 메시지 트리거 (OneSignal 대시보드에서 설정한 조건에 따라)
            await OneSignal.User.addTag('test_trigger', 'true');
            
            const timestamp = new Date().toLocaleTimeString('ko-KR');
            setMessageHistory(prev => [...prev, `[${timestamp}] 테스트 트리거 전송됨`]);
            
            alert('✅ 인앱 메시지 트리거가 전송되었습니다!\n\nOneSignal 대시보드에서 "test_trigger" 태그를 조건으로 하는 인앱 메시지를 생성하세요.');
        } catch (error) {
            console.error('인앱 메시지 트리거 오류:', error);
            alert('❌ 오류가 발생했습니다. 콘솔을 확인하세요.');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 shadow-2xl max-w-md z-50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    📱 인앱 메시지 테스터
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${isOneSignalReady ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {isOneSignalReady ? '● 준비됨' : '● 대기중'}
                </div>
            </div>

            <button
                onClick={triggerTestMessage}
                disabled={!isOneSignalReady}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
                🚀 테스트 메시지 트리거
            </button>

            {messageHistory.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-purple-300">이벤트 히스토리:</h4>
                    <div className="bg-black/30 rounded-lg p-3 max-h-32 overflow-y-auto space-y-1">
                        {messageHistory.map((msg, idx) => (
                            <div key={idx} className="text-xs text-gray-300 font-mono">
                                {msg}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 text-xs text-gray-400 space-y-1">
                <p>💡 <strong>사용 방법:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>OneSignal 대시보드에서 인앱 메시지 생성</li>
                    <li>트리거 조건: <code className="bg-black/30 px-1 rounded">test_trigger = true</code></li>
                    <li>위 버튼을 클릭하여 테스트</li>
                </ol>
            </div>
        </div>
    );
}
