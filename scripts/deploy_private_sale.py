from brownie import PrivateSale, network, config, Munzi
from scripts.helpful_scripts import get_account
from scripts.deploy_munzi import deploy_munzi_token


def deploy_private_sale(rate, token, wallet=get_account()):
    account = get_account()
    private_sale = PrivateSale.deploy(
        rate, wallet, token.address,
        {'from': account}, publish_source=config['networks'][network.show_active()].get('verify', False))
    private_sale.tx.wait(1)

    print('Private Sale contract deployed')

    # Send 40% Token to the private sale contract
    tx = token.transfer(private_sale.address, token.balanceOf(
        account.address)*4/10, {'from': account})
    tx.wait(1)

    print('40 percent of total supply are transferred to the private sale contract.')

    return private_sale


def main():
    rate = int(input('Please enter the rate per each Wei: '))

    if(len(Munzi) > 0):
        token = Munzi[-1]
    else:
        token = deploy_munzi_token()

    deploy_private_sale(rate, token)
