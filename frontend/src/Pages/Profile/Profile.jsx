import { useBackendAttributes } from "../../context/BackEndContext";
import { Card, CardTitle, CardContent } from "../../Components/ui/card";
import ProfileEditModal from "./ProfileEditModal";

export default function ProfileView() {
    const { profile } = useBackendAttributes();
    console.log(profile)

    return (
        <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8">
            <Card className="bg-white rounded-lg shadow-md">
                <CardContent>
                    <CardTitle className="text-5xl font-extrabold text-gray-900 mb-6 flex justify-between justify-center gap-4 ">
                        <ProfileEditModal />
                    </CardTitle>
                    {profile.imageUrl && (
                        <img
                            src={profile.imageUrl}
                            alt={`${profile.username}'s profile`}
                            className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
                        />
                    )}
                    <div className="space-y-4 text-gray-700 text-xl">
                        <p>
                            <strong>Username:</strong> {profile.username}
                        </p>
                        <p>
                            <strong>First Name:</strong> {profile.firstName || "-"}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {profile.lastName || "-"}
                        </p>
                        <p>
                            <strong>Phone:</strong> {profile.phone || "-"}
                        </p>
                        <p> 
                            <strong>Buying Power:</strong> {profile.buyingPower?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || "-"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}