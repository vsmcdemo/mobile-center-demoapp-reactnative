import { PermissionsAndroid, Platform } from 'react-native';
import * as CONST from './const';

class PermissionService {
    constructor() {
    }

    requestLocationPermission(onAllow, onErrorOrDenied) {
        if (Platform.OS == CONST.PLATFORM_ANDROID) {
            try {
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(function(wasAlreadyGranted) {
                        if (!wasAlreadyGranted) {
                            PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                            ).then(function (granted) {
                                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                    console.log("Location access permission: ok")
                                    onAllow();
                                } else {
                                    console.log("Location access permission: denied")
                                    onErrorOrDenied();
                                }
                            }).catch(function(err) {
                                console.log(err);
                                onErrorOrDenied();
                            });
                        } else {
                            console.log("Location access permission: already was granted")
                            onAllow();
                        }
                    }).catch(function(err) {
                        console.log(err);
                        onErrorOrDenied();
                    })
            } catch (err) {
                console.log(err);
                onErrorOrDenied();
            }
        } else if (Platform.OS == CONST.PLATFORM_IOS) {
            onAllow();
        }
    }
}

export default new PermissionService();