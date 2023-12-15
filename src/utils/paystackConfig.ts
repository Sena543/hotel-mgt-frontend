import { PaystackProps } from "react-paystack/dist/types";
import { GuestsType } from "../constants/genericTypes";

export function onSucess(reference: string) {
    //TODO- function to save the reference to be
    console.log(reference);
}

export function onClose() {}
export default function paystackConfig(
    profileDetails: GuestsType,
    totalAmount: number
): PaystackProps {
    return {
        reference: new Date().getTime().toString(),
        email: profileDetails?.email,
        amount: totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        lastname: profileDetails?.lastName,
        firstname: profileDetails?.firstName,
        phone: profileDetails?.contact,
        currency: "GHS",
    };
}
