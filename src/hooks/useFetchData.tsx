import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import firestoredb from "../../firebase-config";

async function useFetchData(dbName: string) {
	const [fetchedData, setFetchedData] = useState([]);
	const collectionRef = collection(firestoredb, dbName);
	useEffect(() => {
		const fectchData = async () => {
			const data = await getDocs(collectionRef);
			let returnedData: any = [];

			data.docs.map((doc) => {
				returnedData.push({
					...doc.data(),
				});
			});

			console.log(returnedData);
			setFetchedData(returnedData);
		};
		fectchData();
	}, []);

	return fetchedData;
}

export default useFetchData;
