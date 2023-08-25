const item = localStorage.getItem('UserInfosBlog') || '{}';
export const UserInfos = JSON.parse(item);
const getCookie = (name: string): string | undefined => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift()?.trim();
    }
}
export const token: string | undefined = getCookie("token");
export const serverAddress = 'https://my-blogs-eqye.onrender.com';