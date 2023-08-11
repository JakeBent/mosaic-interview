/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import chai from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import BookService from '../v1/resources/book/book.service';
import Book from '../v1/resources/book/book.model';

chai.use(sinonChai);
const { expect } = chai;

describe('Book Service', () => {
  const service = new BookService();
  let createStub: Sinon.SinonStub;
  let findOneStub: Sinon.SinonStub;

  beforeEach(() => {
    createStub = Sinon.stub(Book, 'create');
  });

  afterEach(() => {
    createStub.restore();
    findOneStub.restore();
  });

  describe('#create', () => {
    const data = {
      isbn: '1234567890124',
      author: 'Jake Benton',
      title: 'The way of code',
      genre: 'self-help',
      publicationDate: new Date('2022-08-01T00:00:00.000Z'),
      price: 15.00,
      quantity: 1,
    };

    describe('when a matching book exists', () => {
      let saveStub: Sinon.SinonStub;

      beforeEach(() => {
        const book = new Book({ quantity: 0 });
        saveStub = Sinon.stub(book, 'save');
        findOneStub = Sinon.stub(Book, 'findOne').resolves(book);
      });

      afterEach(() => {
        saveStub.restore();
      });

      it('increments the quantity property of the book', async () => {
        await service.create(data);

        expect(findOneStub).to.have.been.calledOnceWith({ isbn: data.isbn });
        expect(saveStub).to.have.been.calledOnce;
        expect(createStub).to.not.have.been.called;
      });
    });

    describe('when a matching book does not exist', () => {
      beforeEach(() => {
        findOneStub = Sinon.stub(Book, 'findOne');
      });

      it('creates a book', async () => {
        await service.create(data);

        expect(createStub).to.have.been.calledOnceWith(data);
        expect(findOneStub).to.have.been.calledOnceWith({ isbn: data.isbn });
      });
    });
  });
});
