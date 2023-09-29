import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { verifyMessage } from '@unisat/wallet-utils'
import { Buffer } from 'buffer'
import crypto from 'crypto'
import moment from 'moment'

import { setAddress, setConnected } from '../slices/mainSlice'

function ConnectWalletButton() {
    const account = useSelector((state) => state.account)
    const dispatch = useDispatch()
    const dropdownRef = useRef()

    const [details, setDetails] = useState({})

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false)
            }
        }

        window.addEventListener('click', handleOutsideClick)

        return () => {
            window.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    useEffect(() => {
        const connectWalletOnLoad = async () => {
            try {
                if (window.unisat) {
                    const accounts = await window.unisat.getAccounts()
                    const detailsString = window.localStorage.getItem('details')
                    const detailsJson =
                        detailsString !== 'null'
                            ? JSON.parse(detailsString)
                            : null
                    setDetails(detailsJson)

                    if (detailsJson !== null) {
                        const now = moment()
                        if (now.isAfter(detailsJson.expiry)) {
                            handleLogout()
                            return
                        }
                        dispatch(setAddress(accounts[0]))
                        dispatch(setConnected(true))
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        connectWalletOnLoad()
    }, [])

    const sign = async (message) => {
        try {
            const accounts = await window.unisat.requestAccounts()
            const account = accounts[0]
            const signature = await window.unisat.signMessage(message)
            const pubkey = await window.unisat.getPublicKey()

            const matching = verifyMessage(pubkey, message, signature)
            if (matching) {
                dispatch(setAddress(account))
                dispatch(setConnected(true))
                const item = {
                    address: account,
                    signature: signature,
                    expiry: moment().add(1, 'days').format(),
                }
                window.localStorage.setItem('details', JSON.stringify(item))
                setDetails(item)
            } else {
                alert('Signature is not valid')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async () => {
        try {
            if (typeof window.unisat !== 'undefined') {
                const domain = window.location.host
                const accounts = await window.unisat.requestAccounts()
                const account = accounts[0]
                const randomBytes = crypto.randomBytes(8)
                const hexRandom = `${Buffer.from(randomBytes, 'utf8').toString(
                    'hex'
                )}`
                const date = moment().format()
                const message = `${domain} wants you to sign in with your Bitcoin account:\n${account}\n\nI accept the Unisat Terms of Service: https://unisat.io/terms-of-service.html\n\nURI: https://${domain}\nVersion: 1\nNetwork: Livenet\nNonce: ${hexRandom}\nIssued At: ${date}Z\nExpire At: ${moment(
                    date
                )
                    .add(1, 'days')
                    .format()}Z`
                sign(message)
            } else {
                window.open('https://unisat.io/', '_blank')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            window.unisat.on('accountsChanged', () => {
                dispatch(setAddress(''))
                dispatch(setConnected(false))
                window.localStorage.removeItem('details')
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
        }
    })

    const handleLogout = () => {
        dispatch(setAddress(''))
        dispatch(setConnected(false))
        window.localStorage.removeItem('details')
    }

    const changeNetwork = async () => {
        try {
            await window.unisat.switchNetwork('livenet')
        } catch (error) {
            console.log(error)
        }
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(account.address)

        alert('Address copied to clipboard!')
    }

    async function handleProfileClick() {
        window.open(`/profile/${account.address}`, '_blank')
    }

    return (
        <div>
            {details && account.connected ? (
                <div
                    ref={dropdownRef}
                    className="relative inline-block text-left"
                >
                    <button
                        className={
                            'text-base rounded-lg bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray'
                        }
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {details.address?.slice(0, 6) +
                            '...' +
                            account.address?.slice(
                                account.address?.length - 4,
                                account.address?.length
                            )}
                    </button>
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                <span
                                    href="#"
                                    className="select-none block px-4 py-2 text-base bg-darkerLightGray hover:bg-defaultGray cursor-pointer rounded-t-lg border-none"
                                    role="menuitem"
                                    onClick={() => {
                                        window.location.href = `/profile/${account.address}`
                                    }}
                                >
                                    Profile
                                </span>
                                <hr className="border-defaultGray" />
                                <span
                                    href="#"
                                    className="select-none block px-4 py-2 text-base bg-darkerLightGray hover:bg-defaultGray cursor-pointer rounded-b-lg"
                                    role="menuitem"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className="text-base rounded-lg bg-darkerLightGray border-lightGray hover:bg-defaultGray hover:border-lightGray"
                    onClick={() => handleLogin()}
                >
                    Connect Unisat
                </button>
            )}
        </div>
    )
}

export default ConnectWalletButton
