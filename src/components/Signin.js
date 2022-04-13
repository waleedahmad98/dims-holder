import React from 'react';
import { useConnect } from "@stacks/connect-react";
import BubbleSVG from './BubbleSVG';

export const Signin = () => {
  const { doOpenAuth } = useConnect();

  return (
    <div className='row g-0 ms-5'>
      <div className='col-6'>
        <div className='d-flex flex-column align-items-start'>
          <div className='mt-5 mb-5'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 439.02 668.28"
              height="8rem"
            >
              <g data-name="Layer 1">
                <path
                  d="M168.68 521.75c-7.83-36 6.86-74.32 37.45-95.05 27.48-18.62 63.75-21.24 93.33-5.84 28.78 15 48.15 44.87 49.32 77.4a92 92 0 0 1-45.19 82.38c-35 20.44-80 14.75-109.28-13.2-7-6.67-17.6 3.92-10.6 10.61 30.34 29 75.76 38.11 114.64 21.84a107.16 107.16 0 0 0 64.94-87.71c4-38.07-14.14-75.77-45.28-97.62-31.84-22.33-74.75-24.6-109.16-6.91C166 429.7 144 478.93 154.21 525.73c2 9.43 16.52 5.44 14.47-4ZM311.77 237.76c29.54-20.67 68.51-23 99.73-4.6a92 92 0 0 1 44.81 82.31c-1.22 32.1-20.16 61.72-48.43 76.78-29.49 15.72-65.81 13.51-93.52-4.91-35.78-23.79-49-70-33.75-109.75 3.46-9-11-12.92-14.46-4-15.61 40.69-4.26 88.47 28.49 117.35 28.78 25.39 70.06 33.77 106.3 20.66 35.49-12.84 62.67-44.46 68.86-81.88 6.32-38.24-8.51-77.72-39.21-101.61-36.54-28.44-88.35-29.94-126.39-3.32-7.85 5.49-.37 18.5 7.57 12.95ZM567.94 511.4A91.19 91.19 0 1 1 458 412.78c40-8.81 81.1 11.34 100.16 47.22 4.54 8.53 17.49 1 13-7.57-19.7-37.08-60.83-60.14-102.84-56.29-38.72 3.55-73.16 27.93-88.54 63.8-15 34.93-10 76.14 13.12 106.36a107.13 107.13 0 0 0 103 40.06c47.07-8.11 82.08-48 87-95 .42-4-3.75-7.5-7.5-7.5-4.41 0-7.07 3.46-7.5 7.5ZM148.85 765.34V635.19h48.57q21.45 0 35.93 8.71a55.43 55.43 0 0 1 21.72 23.47 73.2 73.2 0 0 1 7.25 32.72q0 19.78-8.07 34.46a56.67 56.67 0 0 1-22.64 22.73q-14.56 8.07-34.19 8.06Zm82.85-65.25a47.3 47.3 0 0 0-4-20.08 31.09 31.09 0 0 0-11.73-13.56q-7.69-4.86-18.52-4.86h-18.54V739h18.51q11 0 18.61-5a32.32 32.32 0 0 0 11.64-14 47.61 47.61 0 0 0 4.03-19.91ZM280.09 765.34V635.19h30.07v130.15ZM437.74 765.34v-77.72l-28.23 56.46h-16.32l-28-56.46v77.72h-30.11V635.19h32.63l33.73 68 33.73-68h32.63v130.15ZM570.82 673.32a34.71 34.71 0 0 0-3.94-2.65 71.88 71.88 0 0 0-8.25-4.31 68.73 68.73 0 0 0-10.73-3.76 45.47 45.47 0 0 0-11.73-1.6q-7.7 0-11.91 2.73a8.89 8.89 0 0 0-4.22 8 8.42 8.42 0 0 0 3.21 6.82 27.6 27.6 0 0 0 9.26 4.54q6 1.9 14.84 4.27a117.57 117.57 0 0 1 21.65 8.12 35.81 35.81 0 0 1 14 11.9q4.85 7.27 4.86 19.26 0 10.73-4 18.45a31.82 31.82 0 0 1-11 12.36 49.55 49.55 0 0 1-15.77 6.72 77.23 77.23 0 0 1-18.06 2.09 98.14 98.14 0 0 1-19.52-2 109.18 109.18 0 0 1-19.15-5.68 107.93 107.93 0 0 1-16.87-8.43l13-26.4a23 23 0 0 0 4.95 3.49 97.63 97.63 0 0 0 10 5 100.84 100.84 0 0 0 13.37 4.76 52.6 52.6 0 0 0 14.66 2.11q8.25 0 12.19-2.59a8 8 0 0 0 3.94-7 8.74 8.74 0 0 0-4.12-7.56 44.06 44.06 0 0 0-11.18-5.1q-7.06-2.26-16.23-4.82a104.33 104.33 0 0 1-19.7-8.28 30 30 0 0 1-11.55-11q-3.76-6.56-3.76-16.21 0-13.83 6.51-23.21a40.72 40.72 0 0 1 17.51-14.2 59.19 59.19 0 0 1 24-4.82 70 70 0 0 1 17.78 2.2 106.14 106.14 0 0 1 16 5.5 98 98 0 0 1 13 6.78ZM154.27 873.44v-87.62h20.24v87.62ZM243.87 811.49a21.37 21.37 0 0 0-2.66-1.79 48.17 48.17 0 0 0-5.55-2.9 46.21 46.21 0 0 0-7.22-2.53 30.64 30.64 0 0 0-7.9-1c-3.45 0-6.13.61-8 1.83a6 6 0 0 0-2.84 5.39 5.69 5.69 0 0 0 2.16 4.59 18.71 18.71 0 0 0 6.23 3.05q4.08 1.29 10 2.88a80 80 0 0 1 14.56 5.44 24 24 0 0 1 9.44 8q3.27 4.89 3.27 13a27 27 0 0 1-2.65 12.42 21.5 21.5 0 0 1-7.4 8.32 33.19 33.19 0 0 1-10.62 4.52 51.8 51.8 0 0 1-12.15 1.41 66.08 66.08 0 0 1-13.15-1.36 74.57 74.57 0 0 1-24.25-9.5l8.76-17.77a15.83 15.83 0 0 0 3.33 2.34 67.27 67.27 0 0 0 6.73 3.39 66.35 66.35 0 0 0 8.95 3.21 35.42 35.42 0 0 0 9.87 1.42q5.55 0 8.21-1.74a5.4 5.4 0 0 0 2.65-4.75 5.86 5.86 0 0 0-2.77-5.08 29.46 29.46 0 0 0-7.53-3.44q-4.75-1.53-10.92-3.24a70.24 70.24 0 0 1-13.29-5.6 20.27 20.27 0 0 1-7.78-7.41 21.74 21.74 0 0 1-2.53-10.91q0-9.32 4.38-15.63a27.34 27.34 0 0 1 11.8-9.6 39.72 39.72 0 0 1 16.17-3.25 47.18 47.18 0 0 1 12 1.48 72.56 72.56 0 0 1 10.74 3.7 66.66 66.66 0 0 1 8.76 4.57ZM319.77 811.49a21.37 21.37 0 0 0-2.66-1.79 48.17 48.17 0 0 0-5.55-2.9 46.21 46.21 0 0 0-7.22-2.53 30.64 30.64 0 0 0-7.9-1q-5.19 0-8 1.83a6 6 0 0 0-2.84 5.39 5.69 5.69 0 0 0 2.16 4.59 18.71 18.71 0 0 0 6.23 3.05q4.08 1.29 10 2.88a80 80 0 0 1 14.56 5.44 24 24 0 0 1 9.44 8q3.27 4.89 3.27 13a27 27 0 0 1-2.65 12.42 21.5 21.5 0 0 1-7.4 8.32 33.19 33.19 0 0 1-10.62 4.52 51.8 51.8 0 0 1-12.15 1.41 66.08 66.08 0 0 1-13.15-1.36A74.57 74.57 0 0 1 261 863.2l8.76-17.77a15.54 15.54 0 0 0 3.33 2.34 67.27 67.27 0 0 0 6.73 3.39 66.35 66.35 0 0 0 9 3.21 35.42 35.42 0 0 0 9.87 1.42q5.55 0 8.21-1.74a5.4 5.4 0 0 0 2.65-4.75 5.86 5.86 0 0 0-2.77-5.08 29.46 29.46 0 0 0-7.53-3.44q-4.75-1.53-10.92-3.24A70.24 70.24 0 0 1 275 832a20.27 20.27 0 0 1-7.78-7.41 21.74 21.74 0 0 1-2.53-10.91q0-9.32 4.38-15.63a27.34 27.34 0 0 1 11.79-9.56 39.72 39.72 0 0 1 16.17-3.25 47.18 47.18 0 0 1 12 1.48 72.56 72.56 0 0 1 10.74 3.7 66.66 66.66 0 0 1 8.76 4.57ZM380.73 874.06q-10.49 0-17.89-3.51a31.81 31.81 0 0 1-12-9.68 41.37 41.37 0 0 1-6.78-14 61 61 0 0 1-2.16-16.32v-44.73h20.2v44.72a45.18 45.18 0 0 0 1 9.61 25.66 25.66 0 0 0 3.15 8.07 16.06 16.06 0 0 0 14.5 7.82 17.17 17.17 0 0 0 8.75-2.04 15.91 15.91 0 0 0 5.73-5.79 29.36 29.36 0 0 0 3.21-8.26 41.58 41.58 0 0 0 1.05-9.36v-44.77h20.12v44.74a60.38 60.38 0 0 1-2.28 16.94 41.27 41.27 0 0 1-7 13.87 31.25 31.25 0 0 1-12 9.36 42.37 42.37 0 0 1-17.6 3.33ZM496.87 855.67v17.77h-61.59v-87.62h60.48v17.77h-40.24v17h34.56V837h-34.56v18.63ZM509.21 873.44v-87.62h39.37a26 26 0 0 1 11.6 2.59 29.3 29.3 0 0 1 9.07 6.79 32 32 0 0 1 5.92 9.5 28.59 28.59 0 0 1 2.17 10.86 29.87 29.87 0 0 1-1.79 10.24 28.81 28.81 0 0 1-5 8.77 27.58 27.58 0 0 1-7.53 6.29l19.25 32.58h-22.34l-16.78-28.26h-13.7v28.26Zm20.24-46h18.64a6.8 6.8 0 0 0 4.25-1.48 10.81 10.81 0 0 0 3.15-4.2 14.78 14.78 0 0 0 1.23-6.17 13.32 13.32 0 0 0-1.41-6.35 11.49 11.49 0 0 0-3.58-4.14 7.69 7.69 0 0 0-4.39-1.48h-17.89Z"
                  transform="translate(-148.85 -205.78)"
                  style={{
                    fill: "#231f20",
                  }}
                />
              </g>
            </svg>
          </div>
          <div className='mt-5' style={{ fontWeight: "800", fontSize: "3.5rem" }}>
            A Digital Identity
          </div>
          <div className='mb-3' style={{ fontWeight: "800", fontSize: "3.5rem" }}>
            Management System.
          </div>
          <div style={{ fontWeight: "400", fontSize: "2rem", fontStyle: "italic" }}>
            User Wallet
          </div>
          <button
            className="btn1 btn-lg mt-5"
            id="signin-button"
            onClick={() => doOpenAuth()}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className='col-6'>
        <div className='d-flex flex-row justify-content-end mt-5 me-5'>
          <div className='me-5 anchor-text' onClick={() => { window.open("https://www.stacks.co/", "_blank") }}>
            What is Stacks?
          </div>
          <div className='anchor-text'>
            About the Project
          </div>
        </div>
        <div>
          <BubbleSVG style={{ bottom: 0, right: 0, position: "absolute" }} />
        </div>
      </div>

    </div>
  );
}

export default Signin;
