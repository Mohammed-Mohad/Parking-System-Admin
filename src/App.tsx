import ParkingLot, { ParkingLotProps } from "./Components/ParkingLot";
import ParkingTable from "./Components/ParkingTable";
import  { useState } from "react";
import { database } from "./Utils/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

const App = () => {
  const [parkingAvailability, setParkingAvailability] = useState<ParkingLotProps>([]);
  const [parkingTableData, setParkingTableData] = useState<{[key: string]:string}>({});
  const [AvailableSpots, setAvailableSpots] = useState(20);
  const [TotalSpots, setTotalSpots] = useState(20);
  const db = database;
  const starCountRef = ref(db, "test");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val() as ParkingLotProps;
  
    setTimeout(() => {
      setParkingAvailability(data);
    }, 5000);
  });
  console.log(parkingAvailability);  
  
  useEffect(() => {
    
    const keysToCheck = ['eSlot1', 'eSlot2', 'eSlot3','count'];
    let newParkingTableData: {[key: string]: string} = {};

    for (let key of keysToCheck) {
      if (parkingAvailability[key] !== "Empty Slot") {
        // count++;
        newParkingTableData[key] = parkingAvailability[key];
      }
    }
    let count = parkingAvailability.count;
    if (typeof count === "string") {
      let newCount = parseInt(count);
      if (!isNaN(newCount)) {
    setAvailableSpots(TotalSpots - newCount);
      }
    }
    setParkingTableData(newParkingTableData); // Update parkingTableData
  }, [parkingAvailability, TotalSpots])
  
  return (
    <div>
      {parkingAvailability && (
        <>
          <ParkingLot availableSpots={AvailableSpots.toString()} totalSpots={TotalSpots.toString()} />
          <ParkingTable  data={parkingAvailability}/>
          {/* <Payment entryTime={new Date()} exitTime={new Date()} /> */}
        </>
      )}
    </div>
  );
};

export default App;
