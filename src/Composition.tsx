import { delayRender, staticFile } from 'remotion';
import { useCallback, useEffect, useState } from 'react';

export const MyComposition = () => {
	const [messages, setMessages] = useState<any[]>([]);
	const [handle] = useState(() => delayRender());

	const fetchData = useCallback(async () => {
		const script = await (await fetch(staticFile('script.txt'))).text();
		const messages = []; 
		console.log(script);

		for (let i = 0; i < script.split('\n').length; i++) {
			const person = script.split('\n')[i].split(':')[0].trim().toLowerCase() === 'person a' ? 'a' : 'b';
			const message = script.split('\n')[i].split(':').slice(1).join(':').trim();
			if (message)
				messages.push({ person, message });
		}
		console.log(messages);
		setMessages(messages);
	}, [handle]);
	useEffect(() => {
		fetchData();
	}, []);

  return (
		<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Make sure it fills the Remotion canvas
        width: "100%", // Full width of the canvas
        backgroundColor: "rgb(240, 240, 240)", // Optional background for the parent
			}}
		>
			<div
				style={{
					width: 375,
					borderRadius: 40,
					backgroundColor: "rgb(0, 0, 0)",
					boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px",
					position: "relative",
					paddingBottom: 14,
					transform: "scale(2)",
				}}
				id="chat-preview"
			>
				<div className="mt-0">
					<div className="FTChatIphone_chatHeaderDark__JLXAs">
						<div className="FTChatIphone_backButton__r_CkB">
							<img
								src="https://www.aicut.pro/images/fake-text/iphone/iphone_arrow.png"
								alt="Fake iphone Text Message Contact Avatar"
							/>
						</div>
						<div className="FTChatIphone_contactInfo__NL2rV">
							<div className="FTChatIphone_contactAvatar__PlEcG">U</div>
							<div className="FTChatIphone_contactNameDark__mIN1R">
								<p> {/* */}Unknown</p>
								<img
									src="https://www.aicut.pro/images/fake-text/iphone/mini_arrow.png"
									alt="Fake iphone Text Message Arrow"
									className="h-2 w-2 ml-1 "
								/>
							</div>
						</div>
						<div className="FTChatIphone_videoButton__0ftat">
							<img
								src="https://www.aicut.pro/images/fake-text/iphone/camera_icon.png"
								alt="Fake iphone Text Message Video call"
							/>
						</div>
					</div>
					<div
						style={{
							padding: 16,
							display: "flex",
							flexDirection: "column",
							gap: 10,
							height: 650,
							overflowY: "auto"
						}}
						id="chat-container"
					>	
						{messages.map((messageObject, index) => {
							if (messageObject.person === "a") {
								return (
									<div className="FTChatIphone_messageBubbleGrayDark__InpzI" key={index}>
										{messageObject.message}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height="18.6"
											viewBox="0 0 200 185"
										>
											<path
												fill="#26242b"
												d="M120.5 36.5c5.149 60.646 31.483 109.646 79 147v1h-27c-33.643-2.937-64.31-14.104-92-33.5-21.3-15.009-40.634-32.342-58-52a111.407 111.407 0 0 0-23-16.5v-2c23.813-44.427 60.813-70.76 111-79a41.743 41.743 0 0 0 9-1c-.328 12.178.005 24.178 1 36Z"
											/>
										</svg>
									</div>
								)
							} else {
								return (
									<div className="FTChatIphone_messageBubbleBlue__v1erR" key={index}>
										{messageObject.message}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height="18.6"
											viewBox="0 0 200 185"
										>
											<path
												fill="#007aff"
												d="M120.5 36.5c5.149 60.646 31.483 109.646 79 147v1h-27c-33.643-2.937-64.31-14.104-92-33.5-21.3-15.009-40.634-32.342-58-52a111.407 111.407 0 0 0-23-16.5v-2c23.813-44.427 60.813-70.76 111-79a41.743 41.743 0 0 0 9-1c-.328 12.178.005 24.178 1 36Z"
											/>
										</svg>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
