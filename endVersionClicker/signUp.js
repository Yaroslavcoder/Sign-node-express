
const togglePassword = document.getElementById("togglePassword");
const inputPassword = document.getElementById("password");

togglePassword.addEventListener("click", function () {
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
        togglePassword.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_233_55)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.12738 3.87938L3.966 5.04038L18.9109 19.9856L20.0723 18.8243L5.12738 3.87938Z" fill="#AFB1B6"/>
<path d="M6.41964 7.494L7.51277 8.58713C6.31614 9.606 5.36327 10.8743 4.74752 11.9839L4.74564 11.9876C6.46052 14.8549 9.18152 17.5646 12.6158 17.1536C13.5428 17.0426 14.4075 16.7258 15.1976 16.2724L16.3043 17.3786C14.7641 18.3671 12.9986 18.8906 11.0858 18.6319C7.63652 18.1654 4.81614 15.3364 3.03827 12.0139C3.87302 10.3342 5.01489 8.72738 6.41964 7.494ZM8.90589 5.874C9.87039 5.44425 10.914 5.1915 12.0285 5.1735C12.0904 5.17313 12.825 5.208 13.158 5.26275C13.3669 5.29725 13.575 5.34038 13.7801 5.394C17.052 6.24638 19.476 9.01238 21 11.862C20.3606 13.1531 19.5233 14.4131 18.5246 15.4928L17.4645 14.4326C18.2021 13.6376 18.8171 12.7526 19.2908 11.8943C19.2908 11.8943 18.8145 11.1285 18.4534 10.6477C18.2213 10.3387 17.9771 10.0388 17.7206 9.74963C17.5181 9.52163 16.7318 8.74725 16.5446 8.586C15.2891 7.50638 13.815 6.65925 12.0469 6.6735C11.3621 6.68438 10.7036 6.81938 10.0785 7.04663L8.90589 5.874Z" fill="#AFB1B6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.39526 10.47L10.2949 11.3693C10.236 11.5481 10.2038 11.7394 10.2038 11.9378C10.2038 12.9398 11.0171 13.7531 12.0191 13.7531C12.2175 13.7531 12.4088 13.7213 12.5876 13.662L13.4873 14.5616C13.053 14.8054 12.552 14.9441 12.0191 14.9441C10.3598 14.9441 9.01276 13.5971 9.01276 11.9378C9.01276 11.4049 9.15188 10.9043 9.39526 10.47ZM11.9636 8.93213C11.982 8.93175 12.0008 8.93138 12.0191 8.93138C13.6785 8.93138 15.0255 10.2788 15.0255 11.9378C15.0255 11.9565 15.0255 11.9749 15.0251 11.9933L11.9636 8.93213Z" fill="#AFB1B6"/>
</g>
<defs>
<clipPath id="clip0_233_55">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
        `;
    } else {
        inputPassword.type = "password";
        togglePassword.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 9.6413C10.6696 9.6413 9.58862 10.7233 9.58862 12.0533C9.58862 13.3823 10.6696 14.4633 11.9996 14.4633C13.3296 14.4633 14.4116 13.3823 14.4116 12.0533C14.4116 10.7233 13.3296 9.6413 11.9996 9.6413ZM11.9996 15.9633C9.84262 15.9633 8.08862 14.2093 8.08862 12.0533C8.08862 9.8963 9.84262 8.1413 11.9996 8.1413C14.1566 8.1413 15.9116 9.8963 15.9116 12.0533C15.9116 14.2093 14.1566 15.9633 11.9996 15.9633Z" fill="#AFB1B6"/>
<mask id="mask0_823_25" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="4" width="20" height="17">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00012 4.0002H22V20.1052H2.00012V4.0002Z" fill="white"/>
</mask>
<g mask="url(#mask0_823_25)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.56987 12.0525C5.42987 16.1615 8.56287 18.6045 11.9999 18.6055C15.4369 18.6045 18.5699 16.1615 20.4299 12.0525C18.5699 7.9445 15.4369 5.5015 11.9999 5.5005C8.56387 5.5015 5.42987 7.9445 3.56987 12.0525ZM12.0019 20.1055H11.9979H11.9969C7.86087 20.1025 4.14687 17.2035 2.06087 12.3485C1.97987 12.1595 1.97987 11.9455 2.06087 11.7565C4.14687 6.9025 7.86187 4.0035 11.9969 4.0005C11.9989 3.9995 11.9989 3.9995 11.9999 4.0005C12.0019 3.9995 12.0019 3.9995 12.0029 4.0005C16.1389 4.0035 19.8529 6.9025 21.9389 11.7565C22.0209 11.9455 22.0209 12.1595 21.9389 12.3485C19.8539 17.2035 16.1389 20.1025 12.0029 20.1055H12.0019Z" fill="#AFB1B6"/>
</g>
</svg>
`;
    }
});





document.getElementById("signUpForm").addEventListener("submit", async (e) => {
e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Помилка реєстрації");
        }

        alert("Реєстрація успішна!");
        window.location.href = "signIn.html";
    } catch (error) {
        console.error("Помилка:", error);
        alert(error.message);
    }   
});