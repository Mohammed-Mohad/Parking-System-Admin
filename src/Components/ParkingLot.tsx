import { Card } from "./Card";
 

export interface ParkingLotProps {
  availableSpots: string;
  totalSpots: string;
  [key: string]: string;
}


const ParkingLot = ({ availableSpots, totalSpots }: ParkingLotProps) => {
  
  
  

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-center bg-grey">Zefmesh Parking Lot</h1>
      <div className="grid grid-cols-2 gap-4 ">
        <Card title="Total Spots" value={totalSpots} />
        <Card title="Available Spots" value={availableSpots} />
      </div>
    </main>
  );
};

export default ParkingLot;
