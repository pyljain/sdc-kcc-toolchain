"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.TokenReviewStatus = exports.TokenReviewSpec = exports.isTokenReview = exports.TokenReview = void 0;
// TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
class TokenReview {
    constructor(desc) {
        this.apiVersion = TokenReview.apiVersion;
        this.kind = TokenReview.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
        this.status = desc.status;
    }
}
exports.TokenReview = TokenReview;
function isTokenReview(o) {
    return o && o.apiVersion === TokenReview.apiVersion && o.kind === TokenReview.kind;
}
exports.isTokenReview = isTokenReview;
(function (TokenReview) {
    TokenReview.apiVersion = "authentication.k8s.io/v1beta1";
    TokenReview.group = "authentication.k8s.io";
    TokenReview.version = "v1beta1";
    TokenReview.kind = "TokenReview";
})(TokenReview = exports.TokenReview || (exports.TokenReview = {}));
// TokenReviewSpec is a description of the token authentication request.
class TokenReviewSpec {
}
exports.TokenReviewSpec = TokenReviewSpec;
// TokenReviewStatus is the result of the token authentication request.
class TokenReviewStatus {
}
exports.TokenReviewStatus = TokenReviewStatus;
// UserInfo holds the information about the user needed to implement the user.Info interface.
class UserInfo {
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=io.k8s.api.authentication.v1beta1.js.map