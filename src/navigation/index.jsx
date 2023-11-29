import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab_routes";
import StackRoutes from "./stack.routes";

export default function Routes(){
    return (
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>
    )
}