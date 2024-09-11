import { createParamDecorator, ExecutionContext } from "@nestjs/common"


export const jwtExists = createParamDecorator((data, context: ExecutionContext) => {
    let request = context.switchToHttp().getRequest()
    return request.rawHeaders[1]
})
