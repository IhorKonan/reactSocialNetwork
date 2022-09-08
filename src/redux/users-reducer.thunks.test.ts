//@ts-ignore
import { APIResponseType, ResultCodesEnum } from './../api/api.ts';
//@ts-ignore
import { usersAPI } from "../api/users-api.ts"
//@ts-ignore
import { follow, actions, unfollow } from "./users-reducer.ts"


jest.mock("../api/users-api.ts")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const result: APIResponseType = {
    data: {},
    message: [],
    resultCode: ResultCodesEnum.Success
}

test('success follow thunk ', async () => {
    const thunk = follow(1)
    

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
test('success unfollow thunk ', async () => {
    const thunk = unfollow(1)

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})