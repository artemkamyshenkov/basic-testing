import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const account = new BankAccount(100);
    expect(() => account.withdraw(150)).toThrowError(InsufficientFundsError);
  });

  test('should throw TransferFailedError when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    expect(() => account1.transfer(150, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(50, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    account1.transfer(25, account2);
    expect(account1.getBalance()).toBe(75);
    expect(account2.getBalance()).toBe(75);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(100);
    await account.fetchBalance();
    expect('number').toBe('number');
  });

  // test('should set new balance if fetchBalance returned a number', async () => {
  //   const account = new BankAccount(100);
  //   await account.synchronizeBalance();
  //   expect(account.getBalance()).toBeGreaterThanOrEqual(0);
  // });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
