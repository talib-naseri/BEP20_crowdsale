from brownie import Munzi, network, config
from scripts.helpful_scripts import get_account


def deploy_munzi_token():
    account = get_account()
    munzi_token = Munzi.deploy(
        {'from': account}, publish_source=config['networks'][network.show_active()].get('verify', False))
    munzi_token.tx.wait(1)

    print('Munzi Token deployed')
    return munzi_token


def main():
    deploy_munzi_token()
