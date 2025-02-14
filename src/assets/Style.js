var Style = {
    background: '#222831',
    backgroundLite: '#393E46',
    primaryLite: '#00ADB5',
    primary: '#EEEEEE',
    font1: 'Roboto Mono',
    font2: "Bebas Neue",
    font3: "Daruma Drop"
};

const saveStyleToCookies = (styles) => {
    document.cookie = `styles=${JSON.stringify(styles)};path=/;max-age=31536000`;
};

const loadStyleFromCookies = () => {
    const cookies = document.cookie.split('; ');
    const styleCookie = cookies.find(cookie => cookie.startsWith('styles='));
    if (styleCookie) {
        const styles = JSON.parse(styleCookie.split('=')[1]);
        //Object.assign(Style, styles) // This thing break settings page
        Style = styles
        document.body.style.backgroundColor = Style.background;
    }
};

const deleteStyleCookie = () => {
    document.cookie = "styles=;path=/;max-age=0";
};

export { Style, saveStyleToCookies, loadStyleFromCookies, deleteStyleCookie };