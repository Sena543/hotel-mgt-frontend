import { GuestsType } from "../constants/genericTypes";

export default function paystackConfig(profileDetails: GuestsType) {
    return {
        // reference: new Date().getTime().toString(),
        email: profileDetails?.email,
        amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    };
}
