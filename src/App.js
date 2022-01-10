import React, { useState } from 'react';

import { getOwnBalance } from './Web3Client';
import DefaultPlayground from './dummy3d';

function App() {
	// const [minted, setMinted] = useState(false);
	const [balance, setBalance] = useState(0);

	// const mint = () => {
	// 	mintToken()
	// 		.then((tx) => {
	// 			console.log(tx);
	// 			setMinted(true);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const fetchBalance = () => {
		getOwnBalance()
			.then((balance) => {
				setBalance(balance);
			})
			.catch((err) => {
				console.log(err);
			});
	};



	return (
		<div className="App">
			<DefaultPlayground />
			{/* {!minted ? (
				<button onClick={() => mint()}>Mint token</button>
			) : (
				<p>Token minted successfully!</p>
			)} */}
			<p>Your balance is {balance}</p>
			<button onClick={() => fetchBalance()}>Refresh balance</button>
			{/* <canvas id="renderCanvas"></canvas> */}
			
		</div>
	);
}

export default App;
