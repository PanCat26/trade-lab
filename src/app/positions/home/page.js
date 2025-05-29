import Position from "@/app/components/positions/home/Position";

const somePosition = { id: 1, ticker: 'AAPL', security: 'Apple Inc', type: 'long', size: 10, entryPrice: 150, exitPrice: 165, stopLoss: 140 }

export default function Page() {
    return (
    <>
    <Position position={somePosition}/>
    </>
    );
}